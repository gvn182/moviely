class CreateCustomLists < ActiveRecord::Migration
  def change
    create_table :custom_lists do |t|
      t.integer :user_id
      t.string :name

      t.timestamps null: false
    end
  end
end
