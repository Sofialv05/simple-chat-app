class AddUsernameToMessages < ActiveRecord::Migration[7.2]
  def change
    add_column :messages, :username, :string
  end
end
