

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


describe('LocationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONSOLE_WEATHER_FORECAST_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONSOLE_WEATHER_FORECAST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConsoleWeatherForecastSDK.test()
    const ent = testsdk.Location()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CONSOLE_WEATHER_FORECAST_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'location.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"location","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"Paris.png","kind":"param","name":"location","orig":"location","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{location}.png","json":"{\"operationId\":\"getLocationWeatherPNG\",\"parameters\":[{\"description\":\"Location name with options separated by underscores (e.g., 'Paris_0tqp_lang=fr'). Options include: t=transparency, 0=no frame, q=quiet, p=no-precipitation, lang=language\",\"examples\":{\"simple\":{\"summary\":\"Simple PNG for Paris\",\"value\":\"Paris.png\"},\"transparent\":{\"summary\":\"Transparent PNG\",\"value\":\"Oymyakon_tqp0.png\"},\"withOptions\":{\"summary\":\"PNG with options\",\"value\":\"Paris_0tqp_lang=fr.png\"}},\"in\":\"path\",\"name\":\"location\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"PNG image of weather forecast\"},\"404\":{\"description\":\"Location not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{location}.png","segments":[{"lit":"{location}.png"}],"select":{"exist":["location"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"location","name__orig":"location","Name":"Location","name_":"location","name-":"location","NAME":"LOCATION","index$":3}, {"active":true,"entity":"location","key$":"BasicLocationFlow","kind":"basic","name":"BasicLocationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"location_ref01","srcdatavar":"location_ref01_data","suffix":"_dt0"},"match":{"location":"location01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-location_ref01"}}],"index$":0}]}, 'Location')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let location_ref01_data = Object.values(setup.data.existing.location)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const location_ref01_ent = client.Location()


  })
})



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
  
