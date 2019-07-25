class Coach < ApplicationRecord

    has_many :appointments
    has_many :users, through: :appointments

    has_secure_password

end
