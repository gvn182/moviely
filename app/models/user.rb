class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :lists, class_name: 'CustomList'
  has_many :movies

  after_create :create_uncategorized_list

  def create_uncategorized_list
    self.lists.create(name: 'Uncategorized')
  end
end
