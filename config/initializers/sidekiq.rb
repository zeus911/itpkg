Sidekiq.configure_server do |config|
  config.redis = { url: ENV['ITPKG_REDIS_URL'] }
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV['ITPKG_REDIS_URL'] }
end

Devise::Async.backend = :sidekiq
