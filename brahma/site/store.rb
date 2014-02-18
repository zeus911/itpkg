require 'singleton'
require_relative '../utils/encrypt'
require_relative '../utils/mysql'

module Brahma::Site
  class LogDao
    include Singleton
    Brahma::Mysql::Pool.instance.query [
                                           Brahma::Mysql::Sql.create_table('logs',  true, false, {
                                               message: 'VARCHAR(255) NOT NULL',
                                               type: "CHAR(1) NOT NULL DEFAULT 'I'",
                                               user: 'INTEGER NOT NULL DEFAULT 0'})
                                       ]

    def log(message,user=0,type='I')
      Brahma::Mysql::Pool.instance.execute {|conn|
        conn.query Brahma::Mysql::Sql.insert 'logs', {message:message, user:user, type:type}
      }
    end
  end

  class SettingDao
    include Singleton

    def initialize

      Brahma::Mysql::Pool.instance.query [
                                             Brahma::Mysql::Sql.create_table('settings',  true, true, {
                                                 key: 'VARCHAR(32) NOT NULL',
                                                 val: 'TEXT NOT NULL'}),
                                         ]
    end


    def set(key, val, encrypt=false)
      val=Brahma::Encryptor.instance.obj2hex val, encrypt

      Brahma::Mysql::Pool.instance.execute { |conn|
        rs = conn.query Brahma::Mysql::Sql.select 'settings', ['id'], {key: key}, 1
        conn.query rs.empty? ?
                       Brahma::Mysql::Sql.insert('settings', {key: key, val: val})
                   :
                       Brahma::Mysql::Sql.update('settings', {val: val}, {key: key}, true)
      }
    end

    def get(key, encrypt=false)
      Brahma::Mysql::Pool.instance.execute { |conn|
        rs = conn.query Brahma::Mysql::Sql.select 'settings', %w'val', {key: key}, 1
        val=nil
        rs.each do |row|
          val = Brahma::Encryptor.instance.hex2obj row['val_'], encrypt
        end
        val
      }
    end

  end
end