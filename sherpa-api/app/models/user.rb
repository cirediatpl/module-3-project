class User < ApplicationRecord

    has_many :appointments
    has_many :coaches, through: :appointments

    has_secure_password

end
