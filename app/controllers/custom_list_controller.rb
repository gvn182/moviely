class CustomListController < ApplicationController

  def index
    data = CustomList.all
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
    params.permit(:name).merge(user_id: 1)

  end

end
