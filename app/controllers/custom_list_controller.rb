class CustomListController < ApplicationController
  before_action :authenticate_user!

  def index
    data = CustomList.where(user_id: current_user.id)
    render json: { data: data }
  end

  def create
    CustomList.create(list_params)
    render json: { data: CustomList.all }
  end

  def destroy
    render nothing: true, status: 201
  end

  private
  def list_params
    params.permit(:name).merge(user_id: current_user.id)

  end

end
