

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


describe('LocationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONSOLE_WEATHER_FORECAST_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONSOLE_WEATHER_FORECAST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConsoleWeatherForecastSDK.test()
    const ent = testsdk.Location()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ConsoleWeatherForecastSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Location().load({"location":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CONSOLE_WEATHER_FORECAST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'location.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"location","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /{location}.png","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"Paris.png","k":"param","n":"location","or":"location","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{location}.png","q":{"exist":["location"]},"r":{},"rs":{"binary":true,"kind":"raw","media":"image/png"},"s":[{"lit":"{location}.png"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"location","name__orig":"location","Name":"Location","name_":"location","name-":"location","NAME":"LOCATION","index$":3}, {"active":true,"entity":"location","key$":"BasicLocationFlow","kind":"basic","name":"BasicLocationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"location_ref01","srcdatavar":"location_ref01_data","suffix":"_dt0"},"m":{"location":"location01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-location_ref01"}}],"index$":0}]}, 'Location', {"GET /{location}.png":{"protocol":"http","parameters":[{"name":"location","in":"path","description":"Location name with options separated by underscores (e.g., 'Paris_0tqp_lang=fr'). Options include: t=transparency, 0=no frame, q=quiet, p=no-precipitation, lang=language","required":true,"schema":{"type":"string"},"examples":{"simple":{"value":"Paris.png","summary":"Simple PNG for Paris"},"withOptions":{"value":"Paris_0tqp_lang=fr.png","summary":"PNG with options"},"transparent":{"value":"Oymyakon_tqp0.png","summary":"Transparent PNG"}},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let location_ref01_data = Object.values(setup.data.existing.location)[0] as any

    // LOAD
    const location_ref01_ent = client.Location()
    const location_ref01_match_dt0: any = {}
    location_ref01_match_dt0['location'] = setup.idmap['location'] ?? setup.idmap['location01']
    const location_ref01_data_dt0 = (await location_ref01_ent.load(location_ref01_match_dt0)).data()
    assert(null != location_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/location/LocationTestData.json')

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
    ['location01','location02','location03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONSOLE_WEATHER_FORECAST_TEST_LOCATION_ENTID': idmap,
    'CONSOLE_WEATHER_FORECAST_TEST_LIVE': 'FALSE',
    'CONSOLE_WEATHER_FORECAST_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CONSOLE_WEATHER_FORECAST_TEST_LOCATION_ENTID']

  const live = 'TRUE' === env.CONSOLE_WEATHER_FORECAST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONSOLE_WEATHER_FORECAST_TEST_LOCATION_ENTID']
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
  
