class WordVersion < ApplicationRecord
  belongs_to :word
  belongs_to :user
  has_once :subforum

  def belongs_to(user, word)
    self.user = user
    self.word = word
    self
  end
end
