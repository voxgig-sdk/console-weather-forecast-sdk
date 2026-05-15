package = "voxgig-sdk-console-weather-forecast"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/console-weather-forecast-sdk.git"
}
description = {
  summary = "ConsoleWeatherForecast SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["console-weather-forecast_sdk"] = "console-weather-forecast_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
