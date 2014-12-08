

class Project < ActiveRecord::Base
  validates :name, :creator_id, presence: true

  belongs_to :creator,      class_name: 'User'
  has_many :users,       through: 'ProjectUser'
  has_many :stories
  has_many :story_tags,  through: 'Story'
  has_many :story_types, through: 'Story'
  has_many :tasks,       through: 'Story'

end
