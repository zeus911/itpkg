require 'brahma/web/response'

class DnsController < ApplicationController
  before_action :require_login

  def index
    @ctl_links = {
        '/dns/help' => '帮助文档'
    }
    @index='/dns'
    goto_admin
  end

end