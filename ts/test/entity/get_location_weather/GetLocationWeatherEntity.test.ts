

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetLocationWeatherEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONSOLE_WEATHER_FORECAST_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONSOLE_WEATHER_FORECAST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConsoleWeatherForecastSDK.test()
    const ent = testsdk.GetLocationWeather()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CONSOLE_WEATHER_FORECAST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_location_weather.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"get_location_weather","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /{location}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"London","k":"param","n":"id","or":"location","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"d","or":"d","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"m","or":"m","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"m","or":"M","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"period","or":"period","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"t","or":"T","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"u","or":"u","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/{location}","q":{"exist":["d","format","id","lang","m","period","t","u"]},"r":{"param":{"location":"id"}},"s":[{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_location_weather","name__orig":"get_location_weather","Name":"GetLocationWeather","name_":"get_location_weather","name-":"get-location-weather","NAME":"GET_LOCATION_WEATHER","index$":1}, {"active":true,"entity":"get_location_weather","key$":"BasicGetLocationWeatherFlow","kind":"basic","name":"BasicGetLocationWeatherFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"get_location_weather_ref01","srcdatavar":"get_location_weather_ref01_data","suffix":"_dt0"},"m":{"id":"get_location_weather01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_location_weather_ref01"}}],"index$":0}]}, 'GetLocationWeather', {"GET /{location}":{"protocol":"http","parameters":[{"name":"location","in":"path","description":"Location name (e.g., 'London', 'Salt+Lake+City'), airport code (e.g., 'muc', 'ham'), IP address, domain name (e.g., '@github.com'), or special location (e.g., '~Eiffel+Tower')","required":true,"schema":{"type":"string"},"examples":{"city":{"value":"London","summary":"City name"},"multiword":{"value":"Salt+Lake+City","summary":"Multi-word city name"},"airport":{"value":"muc","summary":"Airport IATA code"},"domain":{"value":"@github.com","summary":"Domain name"},"special":{"value":"~Eiffel+Tower","summary":"Special location/landmark"},"multiple":{"value":"Nuremberg:Hamburg:Berlin","summary":"Multiple locations separated by colon"}},"index$":0},{"name":"u","in":"query","description":"Use USCS units (used by default in US)","required":false,"schema":{"type":"string","enum":[""]},"index$":1},{"name":"m","in":"query","description":"Use metric (SI) units (used by default everywhere except US)","required":false,"schema":{"type":"string","enum":[""]},"index$":2},{"name":"M","in":"query","description":"Use metric (SI) units, but show wind speed in m/s","required":false,"schema":{"type":"string","enum":[""]},"index$":3},{"name":"format","in":"query","description":"Output format for one-line display. Supports formats 1-4 or custom format using %-notation (c=condition, C=condition name, x=plain symbol, h=humidity, t=temperature, f=feels like, w=wind, l=location, m=moon phase, M=moon day, p=precipitation, P=pressure, u=UV index, D=dawn, S=sunrise, z=zenith, s=sunset, d=dusk, T=current time, Z=timezone)","required":false,"schema":{"type":"string"},"index$":4},{"name":"T","in":"query","description":"Force plain text output (disables colors)","required":false,"schema":{"type":"string","enum":[""]},"index$":5},{"name":"d","in":"query","description":"Restrict output to glyphs available in standard console fonts","required":false,"schema":{"type":"string","enum":[""]},"index$":6},{"name":"lang","in":"query","description":"Language for the output","required":false,"schema":{"type":"string"},"index$":7},{"name":"period","in":"query","description":"Update period in seconds for automatic queries with multiple locations","required":false,"schema":{"type":"integer","minimum":1},"index$":8}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_location_weather_ref01_data = Object.values(setup.data.existing.get_location_weather)[0] as any

    // LOAD
    const get_location_weather_ref01_ent = client.GetLocationWeather()
    const get_location_weather_ref01_match_dt0: any = {}
    get_location_weather_ref01_match_dt0.id = get_location_weather_ref01_data.id
    const get_location_weather_ref01_data_dt0 = (await get_location_weather_ref01_ent.load(get_location_weather_ref01_match_dt0)).data()
    assert(get_location_weather_ref01_data_dt0.id === get_location_weather_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_location_weather/GetLocationWeatherTestData.json')

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
    ['get_location_weather01','get_location_weather02','get_location_weather03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONSOLE_WEATHER_FORECAST_TEST_GET_LOCATION_WEATHER_ENTID': idmap,
    'CONSOLE_WEATHER_FORECAST_TEST_LIVE': 'FALSE',
    'CONSOLE_WEATHER_FORECAST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CONSOLE_WEATHER_FORECAST_TEST_GET_LOCATION_WEATHER_ENTID']

  const live = 'TRUE' === env.CONSOLE_WEATHER_FORECAST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONSOLE_WEATHER_FORECAST_TEST_GET_LOCATION_WEATHER_ENTID']
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
  
