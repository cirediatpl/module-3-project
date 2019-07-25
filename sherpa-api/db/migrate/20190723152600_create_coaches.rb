class CreateCoaches < ActiveRecord::Migration[5.2]
  def change
    create_table :coaches do |t|
      t.string :name
      t.string :username
      t.string :password_digest
      t.string :title
      t.string :email
      t.text :address
      t.integer :phone_number
      t.string :industry
      t.text :education
      t.string :image_url
      t.string :workplace_url

      t.timestamps
    end
  end
end
