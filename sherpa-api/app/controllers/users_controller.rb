class UsersController < ApplicationController

    def show
        user = User.find_by(username: params[:username])
        render json: user
    end
    
    def create
        user = User.new(user_params)
        if user.valid?
            user.save
            render json: user
        else
            render json: {error: "Sign-up failed."}, status: 401
        end
    end

    def login
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            render json: user
        else
            render json: {error: "Login failed."}, status: 401
        end
    end

    private

    def user_params
        params.permit(:username, :name, :email, :password, :password_confirmation)
    end

end
