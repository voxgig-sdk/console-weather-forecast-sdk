# ConsoleWeatherForecast SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ConsoleWeatherForecastFeatures
  def self.make_feature(name)
    case name
    when "base"
      ConsoleWeatherForecastBaseFeature.new
    when "ratelimit"
      ConsoleWeatherForecastRatelimitFeature.new
    when "retry"
      ConsoleWeatherForecastRetryFeature.new
    when "test"
      ConsoleWeatherForecastTestFeature.new
    when "timeout"
      ConsoleWeatherForecastTimeoutFeature.new
    else
      ConsoleWeatherForecastBaseFeature.new
    end
  end
end
