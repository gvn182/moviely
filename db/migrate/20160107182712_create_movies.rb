class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.integer :user_id
      t.string :poster_path
      t.float :overview
      t.string :release_date
      t.string :original_title
      t.string :title
      t.string :backdrop_path
      t.float :vote_average

      t.timestamps null: false
    end
  end
end
