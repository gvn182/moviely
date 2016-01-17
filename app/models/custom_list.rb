class CustomList < ActiveRecord::Base
  has_many :movies, dependent: :destroy
end
