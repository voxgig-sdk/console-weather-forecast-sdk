-- ConsoleWeatherForecast SDK error

local ConsoleWeatherForecastError = {}
ConsoleWeatherForecastError.__index = ConsoleWeatherForecastError


function ConsoleWeatherForecastError.new(code, msg, ctx)
  local self = setmetatable({}, ConsoleWeatherForecastError)
  self.is_sdk_error = true
  self.sdk = "ConsoleWeatherForecast"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ConsoleWeatherForecastError:error()
  return self.msg
end


function ConsoleWeatherForecastError:__tostring()
  return self.msg
end


return ConsoleWeatherForecastError
