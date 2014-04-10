class ApplicationController < ActionController::Base
  protect_from_forgery

  layout :layout

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => exception.message
  end

  private

  def layout
    
    is_a?(Devise::SessionsController) ? "devise" : "application"
   
  end

end
