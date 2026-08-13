# ConsoleWeatherForecast SDK utility: make_context

from consoleweatherforecast_sdk.core.context import ConsoleWeatherForecastContext


def make_context_util(ctxmap, basectx):
    return ConsoleWeatherForecastContext(ctxmap, basectx)
