class BgLog
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  store_in collection: 'bg.logs'
end
