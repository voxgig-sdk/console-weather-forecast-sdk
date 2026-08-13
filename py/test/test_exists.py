# ConsoleWeatherForecast SDK exists test

import pytest
from consoleweatherforecast_sdk import ConsoleWeatherForecastSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ConsoleWeatherForecastSDK.test(None, None)
        assert testsdk is not None
