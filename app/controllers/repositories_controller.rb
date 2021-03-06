require 'itpkg/linux/git'

class RepositoriesController < ApplicationController
  before_action :authenticate_user!
  include RepositoriesHelper

  def file
    id = params[:oid]
    @repository = Repository.find params[:repository_id]
    if id && repositories_can_view?
      git = Linux::Git.new @repository.name
      git.open
      node = git.node(id)
      @content = node.read_raw.data
      @name =params[:name]
      git.close
      render 'file', layout: 'buttoned'
    end
  end


  def tree
    id = params[:oid]
    @repository = Repository.find params[:repository_id]
    nodes = {children: [], state: {opened: true}, text: "#{@repository.name}.git"}
    if id && repositories_can_view?
      git = Linux::Git.new @repository.name
      git.open

      _tree_walk(git, id, nodes)

      git.close
    end
    render json: nodes.to_json
  end

  def changes
    @oid = params[:oid]
    @branch = params[:branch]
    @repository = Repository.find params[:repository_id]
    if @oid && @branch && repositories_can_view?
      git = Linux::Git.new @repository.name
      git.open
      if git.branches.include?(@branch)
        patch = git.patch(@oid)
        @patch = patch

        @target = git.target_id @branch
        prev_oids = git.prev_oids(@branch, @oid)
        #puts '#'*80,prev_oids,'#'*80,@oid
        @previous_url = prev_oids.first == @target ? nil : repository_changes_path(@repository.id, oid: prev_oids.first, branch: @branch)
        next_oids = git.next_oids @oid
        #puts '#'*80,next_oids,'#'*80,@oid
        @next_url = next_oids.last == @oid ? nil : repository_changes_path(@repository.id, oid: next_oids.last, branch: @branch)

        @commit = git.info(@oid)


        git.close
        render('changes', layout: 'buttoned') and return
      end
    end
    flash[:alert] = t('labels.not_valid')
    redirect_to repositories_path
  end

  def commits
    cur = params[:oid]
    @branch = params[:branch]
    @repository = Repository.find params[:repository_id]
    if cur && @branch && repositories_can_view?
      git = Linux::Git.new @repository.name
      git.open

      if git.branches.include?(@branch)
        size = 120
        @logs = git.walk(cur, size) { |oid, email, user, time, message| [oid, time, "#{user}<#{email}>", message] }

        target=git.target_id @branch
        prev_oids = git.prev_oids(@branch, cur, size)
        @previous_url = prev_oids.first == target ? nil : repository_commits_path(@repository.id, oid: prev_oids.first, branch: @branch)

        @next_url = @logs.empty? || @logs.size < size ? nil : repository_commits_path(@repository.id, oid: @logs.last.first, branch: @branch)
        render('commits', layout: 'buttoned') and return
      end
    end

    flash[:alert] = t('labels.not_valid')
    redirect_to repositories_path
  end


  def show
    @repository = Repository.find params[:id]
    if repositories_can_view?
      begin
        git = Linux::Git.new @repository.name
        @clone_url = git.url
        git.open
        @branches = git.branches.map do |b|
          {url: repository_commits_path(@repository.id, branch: b, oid: git.target_id(b)), name: b}
        end
        git.close
        render( 'show', layout: 'buttoned') and return
      rescue Rugged::NetworkError => _
        flash[:alert] = t('labels.please_waiting')
      end
    end
    redirect_to repositories_path
  end


  def index

    @repositories = []
    [:creator, :writer, :reader].each do |name|
      Repository.with_role(name, current_user).each{|p| @repositories << {url: repository_path(p.id), name: p.name, details: p.title} if p.enable}
    end

  end

  def new
    @repository = Repository.new
  end

  def create
    @repository = Repository.new params.require(:repository).permit(:name, :title)
    if @repository.save
      current_user.add_role :creator, @repository
      GitAdminJob.perform_later
      #注意 直接到show会有EOF错误
      redirect_to(repositories_path) and return
    end

    render :action => 'new'

  end


  def edit
    @repository = Repository.find params[:id]
    unless repositories_can_edit?
      redirect_to repositories_path
    end
  end

  def update
    @repository = Repository.find params[:id]
    if repositories_can_edit?
      if @repository.update(params.require(:repository).permit(:title))
        redirect_to repository_path(@repository.id)
      else
        render action: 'edit'
      end
    else
      redirect_to repositories_path
    end

  end

  def destroy
    @repository = Repository.find params[:id]
    if repositories_can_edit? && User.with_any_role({name: :reader, resource:@repository}, {name: :writer, resource:@repository}).count == 0
      @repository.update enable: false
      GitAdminJob.perform_later
    else
      flash[:alert] = t('labels.in_using')

    end
    redirect_to repositories_path
  end




  private
  def _tree_walk(git, oid, parent)
    tree = git.tree(oid)

    tree.each_tree do |entry|
      node = {
          children: [],
          state: {opened: false},
          text: entry.fetch(:name),
          icon: 'glyphicon glyphicon-list'
      }
      _tree_walk(git, entry.fetch(:oid), node)
      parent.fetch(:children) << node
    end

    tree.each_blob do |entry|
      parent.fetch(:children) << {
        a_attr: {
            href: "#{repository_file_path(repository_id: @repository.id, oid: entry.fetch(:oid), name: entry.fetch(:name))}"
        },
        text: entry.fetch(:name),
        icon: 'glyphicon glyphicon-leaf'}
    end
  end
end
