# ConsoleWeatherForecast SDK utility: prepare_body
require_relative 'media'
module ConsoleWeatherForecastUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ConsoleWeatherForecastUtilities.raw_body(ctx.reqdata) if ConsoleWeatherForecastUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
