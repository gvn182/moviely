class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :create_uncategorized_list

  def create_uncategorized_list
    CustomList.create(user_id: id, name: 'Uncategorized')
  end
end
