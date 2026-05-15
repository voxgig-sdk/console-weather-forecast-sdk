
import { Context } from './Context'


class ConsoleWeatherForecastError extends Error {

  isConsoleWeatherForecastError = true

  sdk = 'ConsoleWeatherForecast'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ConsoleWeatherForecastError
}

