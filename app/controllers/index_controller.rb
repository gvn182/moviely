class IndexController < ApplicationController
  def search
    title = movie_params[:title]
    title = title.downcase unless title == nil

    data = Movie.where('lower(title) LIKE ? and custom_list_id = ?', "%#{title}%", "#{movie_params[:custom_list_id]}")
    render json: { data: data}
  end

  def find
    movie = Movie.find_by(movie_id: params[:id], custom_list_id: params[:custom_list_id])
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
    movie['movie_id'] = movie['id']
    movie['id'] = nil
    movie['custom_list_id'] = params[:custom_list_id]
    current_user.movies.create(movie)
    render nothing: true, status: 201
  end

  def delete
    current_user.movies.find(params[:id]).destroy
    render nothing: true, status: 204
  end

  private

  def movie_params
    params.permit(:title, :currentPage, :maxSize, :custom_list_id)
  end

  def api_key
    '146efec13c1525fecadaf47d41b250bb'
  end

end
