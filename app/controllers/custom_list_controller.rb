class CustomListController < ApplicationController
  def index
    data = current_user.lists
    render json: { data: data }
  end

  def create
    current_user.lists.create(list_params)
    render json: { data: current_user.lists }
  end

  def destroy
    current_user.lists.find(params[:id]).delete
    render nothing: true, status: 204
  end

  private
  def list_params
    params.permit(:name)
  end

end
