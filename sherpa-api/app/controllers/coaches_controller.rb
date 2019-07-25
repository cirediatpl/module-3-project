class CoachesController < ApplicationController

    def create
        coach = Coach.new(coach_params)
        if coach.valid?
            coach.save
            render json: coach
        else
            render json: {error: "Sign-up failed."}, status: 401
        end
    end

    def login
        coach = Coach.find_by(username: params[:username])
        if coach && coach.authenticate(params[:password])
            render json: coach
        else
            render json: {error: "Login failed."}, status: 401
        end
    end

    def index
        query = (params[:query] || "").downcase
        sort = params[:sort_field] || "name"
        limit = (params[:limit] || 10).to_i
        page = (params[:page] || 0).to_i

        coaches = Coach.all.select do |coach|
            coach.name.downcase.include?(query)
            #  ||
            # coach.title.downcase.include?(query) ||
            # coach.industry.downcase.include?(query) ||
            # coach.education.downcase.include?(query)
        end

        chunks = coaches.each_slice(limit).to_a
        coaches_page = chunks[page]
        if coaches_page != nil
            coaches_page.sort_by!(&sort.to_sym)
        else
            coaches_page
        end
        # edge case: what if coaches_page is nil for sort_by? this needs to be addressed through if else
        
        render json: coaches_page
    end

    private

    def coach_params
        params.permit(:username, :name, :email, :password, :password_confirmation)
    end

end
