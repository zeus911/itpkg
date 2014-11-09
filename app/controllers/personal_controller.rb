class PersonalController < ApplicationController
  before_action :authenticate_user!

  def index
    @items=[
        {
            url: projects_path,
            logo: 'flat/256/businessman3.png',
            label: t('links.projects')
        },
        {
            url: monitor_nodes_path,
            logo: 'flat/256/heart255.png',
            label: t('links.monitor')
        },
        {
            url: logging_nodes_path,
            logo: 'flat/256/chopped.png',
            label: t('links.logging')
        }
    ]
    if admin?
      @items << {
          url: email_path,
          logo: 'flat/256/black218.png',
          label: t('links.email')
      }
      @items << {
          url: vpn_path,
          logo: 'flat/256/cloud229.png',
          label: t('links.vpn')
      }
      @items << {
          url: templates_path,
          logo: 'flat/256/documents7.png',
          label: t('links.template.list')
      }
      @items << {
          url: settings_path,
          logo: 'flat/256/settings48.png',
          label: t('links.settings')
      }
    end
    @items << {
        url: edit_user_registration_path,
        logo: 'flat/256/male80.png',
        label: t('links.personal.info')
    }
    @items << {
        url: document_show_path(name: 'help'),
        logo: 'flat/256/help.png',
        label: t('links.help')
    }
    @items << {
        url: document_show_path(name: 'about_us'),
        logo: 'flat/256/call37.png',
        label: t('links.about_us')
    }

  end
end
