
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ConsoleWeatherForecastSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ConsoleWeatherForecastSDK.test()
    equal(testsdk instanceof ConsoleWeatherForecastSDK, true,
      'ConsoleWeatherForecastSDK.test() must return a client synchronously')
  })

})
