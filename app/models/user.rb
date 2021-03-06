class User < ActiveRecord::Base
  validates :name, presence: true
  has_secure_password

  has_many :accesses
  has_many :purchases
  has_and_belongs_to_many :access_objects
end
