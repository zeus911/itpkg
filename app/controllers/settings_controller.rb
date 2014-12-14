class SettingsController < ApplicationController
  layout 'tabbed'
  before_action :must_admin!
  before_action :_nav_items

  def user
    @user = User.find params[:id]
    case request.method
      when 'GET'
        render 'user', layout: false
      when 'POST'
        unless @user.is_root?
          if params[:status] == 'yes'
            @user.add_role :admin unless @user.is_admin?
          elsif params[:status] == 'no'
            @user.remove_role :admin if @user.is_admin?
          end
        end
        redirect_to settings_users_path
      else
        render status: 404
    end


  end

  def users
    @users = User.order(id: :desc).page(params[:page])
    @items = @users.map { |u| {cols: [u.email, u.is_admin? ? 'Y' : 'N', u.current_sign_in_at||u.last_sign_in_at, u.contact], url: get_settings_user_path(u.id)} }
    render 'users'
  end

  private
  def _nav_items
    @nav_items = [
        {
            name: t('links.settings.users.title'),
            url: settings_users_url
        },
        {
            name: t('links.rss_sites.users.title'),
            url: settings_rss_sites_url
        }
    ]
  end

end
