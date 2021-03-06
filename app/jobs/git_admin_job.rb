require 'sidekiq'
require 'itpkg/linux/git'


class GitAdminJob < ActiveJob::Base
  queue_as :git

  ADMIN_NAME = 'gitolite-admin'
  TESTING_NAME = 'testing'

  def perform
    @git = Linux::Git.new ADMIN_NAME, Setting.git
    logger.info "open from #{@git.url}"
    @git.open
    logger.info "pull from #{@git.url}"
    @git.pull

    logger.info "commit to #{@git.url}"
    @git.commit('Export users from database') do |index|
      Dir[@git.real_path('keydir/*')].each do |f|
        f = File.basename f
        unless f == 'deploy.pub'
          @git.remove index, "keydir/#{f}"
        end
      end

      @git.write(index, 'conf/gitolite.conf') do |f|
        f.puts 'repo gitolite-admin'
        f.puts "\tRW+\t= deploy"
        f.puts 'repo testing'
        f.puts "\tRW+\t= @all"
        f.puts 'repo @all'
        f.puts "\tRW+	\t= deploy"
        f.puts "\t-   VREF/itpkg	= @all"

        Repository.where(enable: true).each do |r|
          f.puts "repo #{r.name}"

          User.with_any_role({name: :creator, resource: r}, {name: :writer, resource: r}).each do |u|
            f.puts "\tRW+\t = #{u.label}"
            write_key index, u.id, u.label
          end

          User.with_any_role({name: :reader, resource: r}).each do |u|
            f.puts "\tR\t = #{u.label}"
            write_key index, u.id, u.label
          end

        end
      end

      @git.write(index, 'version') { |f| f.write Time.now }
    end

    logger.info "push to #{@git.url}"
    @git.push
    logger.info "close from #{@git.url}"
    @git.close
  end


  private

  def write_key(index, uid, label)
    pk = "keydir/#{label}.pub"
    unless File.exist?(@git.real_path(pk))
      key = SshKey.select(:public_key).find_by(user_id: uid)
      @git.write(index, pk) { |f| f.write key.public_key } if key
    end
  end
end
