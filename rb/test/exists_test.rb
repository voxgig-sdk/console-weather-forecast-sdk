# ConsoleWeatherForecast SDK exists test

require "minitest/autorun"
require_relative "../ConsoleWeatherForecast_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ConsoleWeatherForecastSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
