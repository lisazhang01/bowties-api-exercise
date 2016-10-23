class API::BowtiesController < ApplicationController
  before_action :set_errors
  before_action :set_bowtie, only: [:show, :create, :update, :destroy]
  before_action :set_bowties, only: [:index]
  # protect_from_forgery with: :null_session


#Show all bowties
  def index
    render json: @bowties
  end

#Show one bowtie
  def show
    render json: @bowtie
  end

#Create new bowtie
  def create
    @bowtie = Bowtie.new(bowtie_params)

    if @bowtie.save
      render json: @bowtie, status: 201, location: [:api, bowties_path]
    else
      render json: @bowtie.errors.messages, status: 400
    end
  end

#Update
  def update
    @bowtie = Bowtie.find(params[:id])
    if bowtie.update(bowtie_params)
      head 204
    else
      render json: @bowtie.errors.messages, status: 400
    end
  end

#Destroy bowtie
  def destroy
    @bowtie = Bowtie.find(params[:id])
    @bowtie.destroy
    head 204
  end

private
  def bowtie_params
    params.permit(:material, :pattern, :style, :image_url, :wholesale_price, :retail_price)
  end

  def set_bowties
    @bowties = Bowtie.all
    @message = "No Bowties Found" if @bowties.empty?
  end

  def set_bowtie
    @bowtie  = Bowtie.find_by(id: params[:id])
    @message = "Cannot Find Bowtie With ID #{params[:id]}" if @bowtie.nil?
  end

  def set_errors
    @errors  = flash[:errors]
  end
end
