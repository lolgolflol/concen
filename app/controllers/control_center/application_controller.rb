module ControlCenter
  class ApplicationController < ActionController::Base
    protect_from_forgery

    layout "control_center/application"

    # before_filter :get_user_agent
    before_filter :set_controlcenter

    helper_method :current_user, :authenticate_user

    # def ios?
    #   if @user_agent.os.to_s == "iOS"
    #     return true
    #   else
    #     return false
    #   end
    # end

    protected

    def set_controlcenter
      @controlcenter = true
    end

    def current_user
      if session[:user_id]
        @current_user ||= ControlCenter::User.where(:_id => session[:user_id]).first
      end
    end

    def authenticate_user
      redirect_to control_center_signin_path unless current_user
    end

    # def get_user_agent
    #   @user_agent = Agent.new request.env["HTTP_USER_AGENT"]
    # end
  end
end
