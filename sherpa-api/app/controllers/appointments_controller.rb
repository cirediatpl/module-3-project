class AppointmentsController < ApplicationController

    def create
        appointment = Appointment.create(appointment_params)
        render json: appointment
    end

    def update
        appointment = Appointment.find(params[:id])
        appointment.update(appointment_params)
        render json: appointment
    end

    def index
        appointments = Appointment.where(status: "accepted")
        render json: appointments
    end

    private

    def appointment_params
        params.permit(:user_id, :coach_id, :status, :start_time, :address, :duration)
    end

end
