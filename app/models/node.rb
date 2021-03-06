class Node < ActiveRecord::Base
  attr_encrypted :cfg, key: ENV['ITPKG_PASSWORD'], mode: :per_attribute_iv_and_salt
  attr_encrypted :keys, key: ENV['ITPKG_PASSWORD'], mode: :per_attribute_iv_and_salt

  has_many :users
  has_one :node_type
  enum status: {submit: 0, running: 1, stoped: 2}


  validates :keys, :cfg, :creator_id, :node_type_id, :status, :nid, presence: true
  validates :nid, uniqueness: true
end
