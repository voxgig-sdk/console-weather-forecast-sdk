# ConsoleWeatherForecast SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ConsoleWeatherForecastFeatures
  def self.make_feature(name)
    case name
    when "base"
      ConsoleWeatherForecastBaseFeature.new
    when "test"
      ConsoleWeatherForecastTestFeature.new
    else
      ConsoleWeatherForecastBaseFeature.new
    end
  end
end
