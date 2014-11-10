
module Itpkg
  LOCALE = [:en, 'zh-CN'.to_sym]


  # todo
  TEMPLATES_TO_LOAD = [
      {
          flag: 'ops.vpn',
          name: 'setup.sh',
          mode: '400',
          owner: 'root:root',
          body: <<-EOF
#!/bin/sh

          EOF
      },
      {
          flag: 'ops.vpn',
          name: 'install.sh',
          mode: '400',
          owner: 'root:root',
          body: <<-SHELL
#!/bin/sh
apt-get -y install easy-rsa libpam-mysql openvpn

mkdir -p /etc/openvpn/scripts

if [ ! -d /etc/openvpn/easy-rsa/keys ]
then
  make-cadir /etc/openvpn/easy-rsa

  cat >> /etc/openvpn/easy-rsa/vars << "EOF"

export KEY_COUNTRY="US"
export KEY_PROVINCE="CA"
export KEY_CITY="Goleta"
export KEY_ORG="itpkg"
export KEY_EMAIL="admin@itpkg.com"
export KEY_OU="ops"

EOF


  cd /etc/openvpn/easy-rsa
  . ./vars
  ./clean-all
  ./build-dh
  ./pkitool --initca
  ./pkitool --server server
  cd keys
  openvpn --genkey --secret ta.key
  cp ca.crt ta.key dh2048.pem server.crt server.key /etc/openvpn

  cd ..
  ./pkitool client
fi
          SHELL
      },
      {
          flag: 'email.install',
          name: '',
          mode: '400',
          owner: 'root:root',
          body: <<-EOF

          EOF
      },
      {
          flag: 'email.setup',
          name: '',
          mode: '400',
          owner: 'root:root',
          body: <<-EOF

          EOF
      }

  ]

  #--------------------------
  class VpnCFG

    def password(password)

    end

    def drop!(host)
      ["DROP USER 'vpn'@'#{host}'", 'FLUSH PRIVILEGES'].each {|sql| ActiveRecord::Base.connection.execute(sql)}

    end

    def grant!(host)
      db=Rails.configuration.database_configuration[Rails.env]['database']

      password = SecureRandom.hex 8

      ["GRANT SELECT ON `#{db}`.`vpn_users` TO 'vpn'@'#{host}' IDENTIFIED BY '#{password}'",
       "GRANT INSERT ON `#{db}`.`vpn_logs` TO 'vpn'@'#{host}' IDENTIFIED BY '#{password}'",
       'FLUSH PRIVILEGES'].each {|sql| ActiveRecord::Base.connection.execute(sql)}


      password
    end

    def install_sh(cfg)
      lines=['#!/bin/sh']
      lines << <<-CFG


      CFG

      config_files(cfg).each do |k,v|
        lines << "cat > #{k} << \"EOF\" "
        lines << v
        lines << 'EOF'
      end
      lines << 'chmod +x /etc/openvpn/scripts/*.sh'

      lines.join("\n")
    end

    def config_files(cfg)
      db=Rails.configuration.database_configuration[Rails.env].fetch 'database'
      cf = {}

      #crypt(0) -- Used to decide to use MySQL's PASSWORD() function or crypt()
      #0 = No encryption. Passwords in database in plaintext. NOT recommended!
      #1 = Use crypt
      #2 = Use MySQL PASSWORD() function

      cf['/etc/pam.d/openvpn'] = <<-EOF
auth sufficient pam_mysql.so user=vpn passwd=#{cfg.fetch :password} host=db.#{ENV['ITPKG_DOMAIN']} db=#{db} [table=vpn_users] usercolumn=email passwdcolumn=passwd [where=enable=1 AND start_date<=CURDATE() AND end_date>=CURDATE()] sqllog=0 crypt=2
account required pam_mysql.so user=vpn passwd=#{cfg.fetch :password} host=db.#{ENV['ITPKG_DOMAIN']} db=#{db} [table=vpn_users] usercolumn=email passwdcolumn=passwd [where=enable=1 AND start_date<=CURDATE() AND end_date>=CURDATE()] sqllog=0 crypt=2
      EOF

      cf['/etc/openvpn/scripts/config.sh'] = <<-EOF
#!/bin/sh
HOST='db.#{ENV['ITPKG_DOMAIN']}'
PORT='3306'
USER='vpn'
PASS='#{cfg.fetch :password}'
DB='#{db}}'
      EOF

      cf['/etc/openvpn/scripts/connect.sh'] = <<-EOF
#!/bin/sh
. /etc/openvpn/scripts/config.sh
mysql -h$HOST -P$PORT -u$USER -p$PASS $DB -e "INSERT INTO vpn_logs(host_id, flag,email,message,created) values('#{cfg.fetch :id}', C','$common_name', '$trusted_ip;$trusted_port;$ifconfig_pool_remote_ip;$remote_port_1;$bytes_received;$bytes_sent', 'NOW()')"
      EOF
      cf['/etc/openvpn/scripts/disconnect.sh'] = <<-EOF
#!/bin/sh
. /etc/openvpn/scripts/config.sh
mysql -h$HOST -P$PORT -u$USER -p$PASS $DB -e "INSERT INTO vpn_logs(host_id, flag,email,message,created) values('#{cfg.fetch :id}', 'D','$common_name', '$trusted_ip;$trusted_port;$ifconfig_pool_remote_ip;$remote_port_1;$bytes_received;$bytes_sent', 'NOW()')"
      EOF

      cf['/etc/openvpn/openvpn.conf']=<<-EOF
port 1194
proto udp
dev tun

ca /etc/openvpn/ca.crt
cert /etc/openvpn/server.crt
key /etc/openvpn/server.key
dh /etc/openvpn/dh2048.pem

ifconfig-pool-persist ipp.txt

server #{cfg.fetch :network} 255.255.255.0

#{cfg.fetch(:routes).map{|r| "push \"route #{r}\" "}.join("\n") }
      #{cfg.fetch(:dns).map{|d| "push \"dhcp-option #{d}\" "}.join("\n") }


comp-lzo
user nobody
client-to-client
username-as-common-name

plugin /usr/lib/openvpn/openvpn-plugin-auth-pam.so openvpn

script-security 3 system
client-connect /etc/openvpn/scripts/connect.sh
client-disconnect /etc/openvpn/scripts/disconnect.sh

keepalive 10 120
persist-key
persist-tun
status status.log
verb 3
      EOF

      cf
    end

  end

  module EmailCFG
    module_function

    def drop!(host)
      ["DROP USER 'email'@'#{host}'", 'FLUSH PRIVILEGES'].each { |sql| ActiveRecord::Base.connection.execute(sql) }

    end

    def grant!(host)

      db=Rails.configuration.database_configuration[Rails.env]['database']

      password=SecureRandom.hex 8

      ["GRANT INSERT ON `#{db}`.`email_domains` TO 'email'@'#{host}' IDENTIFIED BY '#{password}'",
       "GRANT SELECT ON `#{db}`.`email_users` TO 'email'@'#{host}' IDENTIFIED BY '#{password}'",
       "GRANT INSERT ON `#{db}`.`email_aliases` TO 'email'@'#{host}' IDENTIFIED BY '#{password}'",
       'FLUSH PRIVILEGES'].each { |sql| ActiveRecord::Base.connection.execute(sql) }

      password
    end

    def install_sh(cfg)
      #todo
      'TODO'
    end



    def config_files(host, password)
      {'mysql' => "#{host} #{password}"}
    end
  end

end