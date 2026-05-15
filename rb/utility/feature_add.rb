# ConsoleWeatherForecast SDK utility: feature_add
module ConsoleWeatherForecastUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
