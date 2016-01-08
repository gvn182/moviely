class IndexController < ApplicationController
  def index

  end

  def search
    data = Movie.where('title LIKE ?', "%#{params[:title]}%").page(params[:currentPage]).per(params[:maxSize])
    total_items = Movie.where(movie_params.except(:currentPage, :maxSize)).count
    render json: { data: data, total_items: total_items }
  end

  def find
    movie = Movie.find_by_id(params[:id])

    if movie.nil?
      movie = HTTParty.get("https://api.themoviedb.org/3/movie/#{params[:id]}?api_key=#{api_key}")
      movie['hasMovie'] = false
    else
      movie.hasMovie = true
    end

    render json: { data: movie }
  end

  def create
    movie = HTTParty.get("https://api.themoviedb.org/3/movie/#{params[:id]}?api_key=#{api_key}")
    movie.select!{|x| Movie.attribute_names.index(x)}
    Movie.create(movie)
    render nothing: true, status: 201
  end

  private

  def movie_params
    params.permit(:title, :currentPage, :maxSize)
  end

  def api_key
    return '146efec13c1525fecadaf47d41b250bb'
  end

end
