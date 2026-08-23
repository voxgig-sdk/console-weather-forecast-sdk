
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ConsoleWeatherForecast',
        slug: "console-weather-forecast",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://wttr.in",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_current_location_weather: {
      },

      get_location_weather: {
      },

      help: {
      },

      location: {
      },

    }
  }


  entity = {
    "get_current_location_weather": {
      "fields": [],
      "name": "get_current_location_weather",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "d",
                    "orig": "d",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "1",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "fr",
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "m",
                    "orig": "m",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "m",
                    "orig": "m",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "period",
                    "orig": "period",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "t",
                    "orig": "t",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "u",
                    "orig": "u",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "parts": [],
              "select": {
                "exist": [
                  "d",
                  "format",
                  "lang",
                  "m",
                  "period",
                  "t",
                  "u"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_location_weather": {
      "fields": [],
      "name": "get_location_weather",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "London",
                    "kind": "param",
                    "name": "id",
                    "orig": "location",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "d",
                    "orig": "d",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "m",
                    "orig": "m",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "m",
                    "orig": "m",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "period",
                    "orig": "period",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "t",
                    "orig": "t",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "u",
                    "orig": "u",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{location}",
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "location": "id"
                }
              },
              "select": {
                "exist": [
                  "d",
                  "format",
                  "id",
                  "lang",
                  "m",
                  "period",
                  "t",
                  "u"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "help": {
      "fields": [],
      "name": "help",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/:help",
              "parts": [
                ":help"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "location": {
      "fields": [],
      "name": "location",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "Paris.png",
                    "kind": "param",
                    "name": "location",
                    "orig": "location",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{location}.png",
              "parts": [
                "{location}.png"
              ],
              "select": {
                "exist": [
                  "location"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

