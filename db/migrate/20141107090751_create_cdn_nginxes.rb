class CreateCdnNginxes < ActiveRecord::Migration
  def change
    create_table :cdn_nginxes do |t|
      t.string :name, null:false
      t.string :ip, null:false
      t.boolean :ssl, null:false, default:false
      t.text :cert
      t.text :key
      t.text :domains, null:false
      t.text :backs, null:false
      t.timestamps
    end
    add_index :cdn_nginxes, :ip
  end
end
