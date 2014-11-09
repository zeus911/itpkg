class CreateDnsHosts < ActiveRecord::Migration
  def change
    create_table :dns_hosts do |t|
      t.string :name, null: false
      t.string :ip, null: false
      t.string :encrypted_password, null: false
      t.string :encrypted_password_salt, null: false
      t.string :encrypted_password_iv, null: false
      t.integer :weight, null: false, default: 0
      t.timestamps
    end
    add_index :dns_hosts, :ip, unique: true
  end
end
