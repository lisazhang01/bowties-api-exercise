class Bowtie < ApplicationRecord
  validates :pattern, presence: true
end
