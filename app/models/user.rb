require 'itpkg/services/permission'

class UserValidator < ActiveModel::Validator
  def validate(record)
    if %w(deploy git nobody mail mysql).include?(record.label)
      record.errors[:label] << I18n.t('labels.not_valid')
    end
  end
end

class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable, :timeoutable,
         :async, authentication_keys: [:label]

  has_one :contact
  validates :label, uniqueness: true
  validates :label, presence: true
  validates_format_of :label, with: /\A[a-zA-Z][a-zA-Z0-9_]{2,12}\z/, on: :create

  has_many :repository_users
  has_and_belongs_to_many :repositories, through: :repository_users
  has_and_belongs_to_many :projects

  has_one :ssh_key

  validates_with UserValidator


  def to_s
    "#{self.label}<#{self.email}>"
  end

  def admin?
    Itpkg::PermissionService.admin? self.id
  end
end
