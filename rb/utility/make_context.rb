# ConsoleWeatherForecast SDK utility: make_context
require_relative '../core/context'
module ConsoleWeatherForecastUtilities
  MakeContext = ->(ctxmap, basectx) {
    ConsoleWeatherForecastContext.new(ctxmap, basectx)
  }
end
