class CreateVpnLogs < ActiveRecord::Migration
  def change
    create_table :vpn_logs do |t|
      t.string :flag, limit: 1, null: false, default: 'O'
      t.string :email, null: false
      t.string :message, null: false
      t.integer :host_id, null:false, default:0
      t.timestamp :created, null: false
    end
    add_index :vpn_logs, :email
  end
end
