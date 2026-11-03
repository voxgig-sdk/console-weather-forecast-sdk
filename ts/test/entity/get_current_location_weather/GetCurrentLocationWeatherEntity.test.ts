

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ConsoleWeatherForecastSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ConsoleWeatherForecastSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GetCurrentLocationWeather().load({"d":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CONSOLE_WEATHER_FORECAST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_current_location_weather.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"get_current_location_weather","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"d","or":"d","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"1","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"fr","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"m","or":"m","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"m","or":"M","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"period","or":"period","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"t","or":"T","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"u","or":"u","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/","q":{},"r":{},"rs":{"alternatives":[{"kind":"raw","media":"text/html"},{"kind":"raw","media":"text/plain"}],"kind":"json","media":"application/json"},"s":[],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_current_location_weather","name__orig":"get_current_location_weather","Name":"GetCurrentLocationWeather","name_":"get_current_location_weather","name-":"get-current-location-weather","NAME":"GET_CURRENT_LOCATION_WEATHER","index$":0}, {"active":true,"entity":"get_current_location_weather","key$":"BasicGetCurrentLocationWeatherFlow","kind":"basic","name":"BasicGetCurrentLocationWeatherFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"get_current_location_weather_ref01","srcdatavar":"get_current_location_weather_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_current_location_weather_ref01"}}],"index$":0}]}, 'GetCurrentLocationWeather', {"GET /":{"protocol":"http","parameters":[{"name":"u","in":"query","description":"Use USCS units (used by default in US)","required":false,"schema":{"type":"string","enum":[""]},"index$":0},{"name":"m","in":"query","description":"Use metric (SI) units (used by default everywhere except US)","required":false,"schema":{"type":"string","enum":[""]},"index$":1},{"name":"M","in":"query","description":"Use metric (SI) units, but show wind speed in m/s","required":false,"schema":{"type":"string","enum":[""]},"index$":2},{"name":"format","in":"query","description":"Output format for one-line display. Supports formats 1-4 or custom format using %-notation","required":false,"schema":{"type":"string"},"examples":{"format1":{"value":"1","summary":"Current weather: 🌦 +11⁰C"},"format2":{"value":"2","summary":"Weather with details: 🌦 🌡️+11°C 🌬️↓4km/h"},"format3":{"value":"3","summary":"Location and weather: Nuremberg: 🌦 +11⁰C"},"format4":{"value":"4","summary":"Location and weather with details: Nuremberg: 🌦 🌡️+11°C 🌬️↓4km/h"},"custom":{"value":"%l:+%c+%t","summary":"Custom format using %-notation"}},"index$":3},{"name":"T","in":"query","description":"Force plain text output (disables colors)","required":false,"schema":{"type":"string","enum":[""]},"index$":4},{"name":"d","in":"query","description":"Restrict output to glyphs available in standard console fonts","required":false,"schema":{"type":"string","enum":[""]},"index$":5},{"name":"lang","in":"query","description":"Language for the output","required":false,"schema":{"type":"string"},"examples":{"french":{"value":"fr"},"german":{"value":"de"},"ukrainian":{"value":"uk"}},"index$":6},{"name":"period","in":"query","description":"Update period in seconds for automatic queries","required":false,"schema":{"type":"integer","minimum":1},"index$":7}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
