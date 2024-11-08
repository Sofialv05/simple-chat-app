require "test_helper"

class ChatChannelTest < ActionCable::Channel::TestCase
  test "subscribes to a stream" do
    subscribe
    assert subscription.confirmed?
    assert_has_stream "ChatChannel"
  end

  test "broadcasts a message" do
    subscribe

    ActionCable.server.broadcast "ChatChannel", { content: "test" }

  
    assert_broadcasts("ChatChannel", 1) 
    assert_broadcast_on("ChatChannel", content: "test")
  end
end
