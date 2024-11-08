class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "ChatChannel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_stream_from "ChatChannel"
  end
end
