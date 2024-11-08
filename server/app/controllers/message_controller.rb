class MessageController < ApplicationController
  def index
    messages = Message.all
    render json: messages
  end

  def create
    @message = Message.new(messages_params)
    if @message.save
      render json: @message, status: :created, location: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  def chatroommessages
    chatroom = Chatroom.find(params[:chatroomId])
    allmessages = chatroom.messages
    render json: allmessages
  end

  private

  def messages_params
    params.require(:message).permit(:body, :chatroom_id, :username)
  end
end
