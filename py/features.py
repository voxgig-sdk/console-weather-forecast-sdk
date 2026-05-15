# ConsoleWeatherForecast SDK feature factory

from feature.base_feature import ConsoleWeatherForecastBaseFeature
from feature.test_feature import ConsoleWeatherForecastTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ConsoleWeatherForecastBaseFeature(),
        "test": lambda: ConsoleWeatherForecastTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
