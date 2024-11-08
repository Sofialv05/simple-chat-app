class Message < ApplicationRecord
  belongs_to :chatroom

  after_create_commit { broadcast_message }

  private

  def broadcast_message
    ActionCable.server.broadcast("ChatChannel", {
                                    id:,
                                    body: ,
                                    chatroom_id:,
                                    username:
                                  })
  end
end
