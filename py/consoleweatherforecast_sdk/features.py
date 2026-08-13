# ConsoleWeatherForecast SDK feature factory

from consoleweatherforecast_sdk.feature.base_feature import ConsoleWeatherForecastBaseFeature
from consoleweatherforecast_sdk.feature.test_feature import ConsoleWeatherForecastTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ConsoleWeatherForecastBaseFeature(),
        "test": lambda: ConsoleWeatherForecastTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
