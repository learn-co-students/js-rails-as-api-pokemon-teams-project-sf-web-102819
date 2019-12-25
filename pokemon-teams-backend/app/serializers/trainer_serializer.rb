class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :pokemon
  has_many :pokemon
end
 