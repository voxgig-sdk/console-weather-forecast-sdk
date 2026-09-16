

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ConsoleWeatherForecastSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetCurrentLocationWeatherEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONSOLE_WEATHER_FORECAST_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONSOLE_WEATHER_FORECAST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConsoleWeatherForecastSDK.test()
    const ent = testsdk.GetCurrentLocationWeather()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CONSOLE_WEATHER_FORECAST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_current_location_weather.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"get_current_location_weather","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"d","orig":"d","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"1","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"fr","kind":"query","name":"lang","orig":"lang","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"m","orig":"m","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"m","orig":"m","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"period","orig":"period","reqd":false,"type":"`$INTEGER`","index$":5},{"active":true,"kind":"query","name":"t","orig":"t","reqd":false,"type":"`$STRING`","index$":6},{"active":true,"kind":"query","name":"u","orig":"u","reqd":false,"type":"`$STRING`","index$":7}]},"contract":{"id":"GET /","json":"{\"operationId\":\"getCurrentLocationWeather\",\"parameters\":[{\"description\":\"Use USCS units (used by default in US)\",\"in\":\"query\",\"name\":\"u\",\"required\":false,\"schema\":{\"enum\":[\"\"],\"type\":\"string\"}},{\"description\":\"Use metric (SI) units (used by default everywhere except US)\",\"in\":\"query\",\"name\":\"m\",\"required\":false,\"schema\":{\"enum\":[\"\"],\"type\":\"string\"}},{\"description\":\"Use metric (SI) units, but show wind speed in m/s\",\"in\":\"query\",\"name\":\"M\",\"required\":false,\"schema\":{\"enum\":[\"\"],\"type\":\"string\"}},{\"description\":\"Output format for one-line display. Supports formats 1-4 or custom format using %-notation\",\"examples\":{\"custom\":{\"summary\":\"Custom format using %-notation\",\"value\":\"%l:+%c+%t\"},\"format1\":{\"summary\":\"Current weather: 🌦 +11⁰C\",\"value\":\"1\"},\"format2\":{\"summary\":\"Weather with details: 🌦 🌡️+11°C 🌬️↓4km/h\",\"value\":\"2\"},\"format3\":{\"summary\":\"Location and weather: Nuremberg: 🌦 +11⁰C\",\"value\":\"3\"},\"format4\":{\"summary\":\"Location and weather with details: Nuremberg: 🌦 🌡️+11°C 🌬️↓4km/h\",\"value\":\"4\"}},\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Force plain text output (disables colors)\",\"in\":\"query\",\"name\":\"T\",\"required\":false,\"schema\":{\"enum\":[\"\"],\"type\":\"string\"}},{\"description\":\"Restrict output to glyphs available in standard console fonts\",\"in\":\"query\",\"name\":\"d\",\"required\":false,\"schema\":{\"enum\":[\"\"],\"type\":\"string\"}},{\"description\":\"Language for the output\",\"examples\":{\"french\":{\"value\":\"fr\"},\"german\":{\"value\":\"de\"},\"ukrainian\":{\"value\":\"uk\"}},\"in\":\"query\",\"name\":\"lang\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Update period in seconds for automatic queries\",\"in\":\"query\",\"name\":\"period\",\"required\":false,\"schema\":{\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"JSON-formatted weather data\",\"type\":\"object\"}},\"text/html\":{\"schema\":{\"description\":\"HTML-formatted weather forecast for web browsers\",\"type\":\"string\"}},\"text/plain\":{\"example\":\"Weather for City: Paris, France\\n\\n     \\\\   /     Clear\\n      .-.      10 – 11 °C\\n   ― (   ) ―   ↑ 11 km/h\\n      `-'      10 km\\n     /   \\\\     0.0 mm\",\"schema\":{\"description\":\"ANSI-formatted weather forecast for terminal display\",\"type\":\"string\"}}},\"description\":\"Successful weather forecast response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/","segments":[],"select":{"exist":["d","format","lang","m","period","t","u"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_current_location_weather","name__orig":"get_current_location_weather","Name":"GetCurrentLocationWeather","name_":"get_current_location_weather","name-":"get-current-location-weather","NAME":"GET_CURRENT_LOCATION_WEATHER","index$":0}, {"active":true,"entity":"get_current_location_weather","key$":"BasicGetCurrentLocationWeatherFlow","kind":"basic","name":"BasicGetCurrentLocationWeatherFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"get_current_location_weather_ref01","srcdatavar":"get_current_location_weather_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_current_location_weather_ref01"}}],"index$":0}]}, 'GetCurrentLocationWeather')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_current_location_weather_ref01_data = Object.values(setup.data.existing.get_current_location_weather)[0] as any

    // LOAD
    const get_current_location_weather_ref01_ent = client.GetCurrentLocationWeather()
    const get_current_location_weather_ref01_match_dt0: any = {}
    const get_current_location_weather_ref01_data_dt0 = (await get_current_location_weather_ref01_ent.load(get_current_location_weather_ref01_match_dt0)).data()
    assert(null != get_current_location_weather_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_current_location_weather/GetCurrentLocationWeatherTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ConsoleWeatherForecastSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_current_location_weather01','get_current_location_weather02','get_current_location_weather03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONSOLE_WEATHER_FORECAST_TEST_GET_CURRENT_LOCATION_WEATHER_ENTID': idmap,
    'CONSOLE_WEATHER_FORECAST_TEST_LIVE': 'FALSE',
    'CONSOLE_WEATHER_FORECAST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CONSOLE_WEATHER_FORECAST_TEST_GET_CURRENT_LOCATION_WEATHER_ENTID']

  const live = 'TRUE' === env.CONSOLE_WEATHER_FORECAST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONSOLE_WEATHER_FORECAST_TEST_GET_CURRENT_LOCATION_WEATHER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ConsoleWeatherForecastSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CONSOLE_WEATHER_FORECAST_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
