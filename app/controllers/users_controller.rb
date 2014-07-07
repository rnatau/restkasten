class UsersController < ApplicationController
  before_filter :set_default_response_format
  skip_before_action :verify_authenticity_token


  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render :show, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end


  private
  def set_default_response_format
    request.format = :json
  end

  def user_params
    params.permit(:name, :password)
  end


end