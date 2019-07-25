class CreateAppointments < ActiveRecord::Migration[5.2]
  def change
    create_table :appointments do |t|
      t.string :status
      t.datetime :start_time
      t.string :address
      t.integer :duration
      t.references :coach, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
