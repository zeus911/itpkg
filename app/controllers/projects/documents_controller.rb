class Projects::DocumentsController < ApplicationController
  before_action :authenticate_user!
  before_action :_can_project?

  def index
    @documents = Document.select(:id, :name, :size).where('project_id = ? AND status = ?', @project.id, Document.statuses[:project]).map { |d| {cols: [d.title, d.ext, d.size], url: project_document_path(d.id, project_id: @project.id)} }
    @buttons=[]
  end

  def show

  end

  def create
    files = params.fetch(:files).map do |tf|
      doc = Document.new project_id: @project.id, creator_id: current_user.id,
                            name:tf.original_filename, ext:_file_ext(tf.original_filename),
                            size:tf.size
      doc.avatar= tf
      if doc.save
        {
            id: doc.id,
            name: doc.name,
            size: doc.size,
            url: project_document_path(doc.id, project_id:@project.id)
        }
      else
        {
            name:tf.original_filename,
            error:doc.errors
        }
      end
    end

    render json:{files:files}

  end

  def edit

  end

  def update

  end

  def destroy

  end

  private
  def _can_edit?
    @document.creator_id == current_user.id
  end

  def _can_view?
    #todo
    true
  end

  def _can_project?
    #todo
    @project = Project.find params[:project_id]
  end

  def _file_ext(name)
    i = name.rindex('.')
    name[i+1, name.size].downcase if i
  end
end
