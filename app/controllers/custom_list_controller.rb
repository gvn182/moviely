class CustomListController < ApplicationController
  def index
    data = CustomList.where(user_id: current_user.id)
    render json: { data: data }
  end

  def create
    CustomList.create(list_params)
    render json: { data: CustomList.find_by(user_id: current_user.id).all }
  end

  def destroy
    Movie.destroy_all(custom_list_id: params[:id])
    CustomList.destroy(params[:id])
    render nothing: true, status: 204
  end

  private
  def list_params
    params.permit(:name).merge(user_id: current_user.id)
  end

end
