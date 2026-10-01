import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "get_current_location_weather",
    "accessor": "GetCurrentLocationWeather",
    "op": "load",
    "method": "GET",
    "path": "/",
    "args": [],
    "select": {
      "d": "v1",
      "format": "v1",
      "lang": "v1",
      "m": "v1",
      "period": "v1",
      "t": "v1",
      "u": "v1"
    },
    "headers": [],
    "query": [
      "u",
      "m",
      "M",
      "format",
      "T",
      "d",
      "lang",
      "period"
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "get_location_weather",
    "accessor": "GetLocationWeather",
    "op": "load",
    "method": "GET",
    "path": "/{location}",
    "args": [
      {
        "name": "id",
        "wire": "location",
        "value": "p1"
      }
    ],
    "select": {
      "d": "v1",
      "format": "v1",
      "lang": "v1",
      "m": "v1",
      "period": "v1",
      "t": "v1",
      "u": "v1"
    },
    "headers": [],
    "query": [
      "u",
      "m",
      "M",
      "format",
      "T",
      "d",
      "lang",
      "period"
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "help",
    "accessor": "Help",
    "op": "load",
    "method": "GET",
    "path": "/:help",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "location",
    "accessor": "Location",
    "op": "load",
    "method": "GET",
    "path": "/{location}.png",
    "args": [
      {
        "name": "location",
        "wire": "location",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
