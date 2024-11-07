class ChatroomController < ApplicationController
  def index
    chatrooms = Chatroom.all
    render json: chatrooms
  end

  def create
    chatroom = Chatroom.new(chatroom_params)
    if chatroom.save
      render json: chatroom, status: :created
    else
      render json: { errors: chatroom.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    chatroom = Chatroom.find(params[:id])
    if chatroom
      chatroom.destroy
      render json:chatroom
    else
      render json: {errors: "Chatroom not found"}, status: :not_found
    end
  end

  private

  def chatroom_params
    params.require(:chatroom).permit(:name)
  end
end
