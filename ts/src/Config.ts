
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "segments": [],
              "parts": [],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "d",
                    "orig": "d",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "1"
                  },
                  {
                    "name": "lang",
                    "orig": "lang",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "fr"
                  },
                  {
                    "name": "m",
                    "orig": "m",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "m",
                    "orig": "M",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "period",
                    "orig": "period",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "t",
                    "orig": "T",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "u",
                    "orig": "u",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "alternatives": [
                  {
                    "kind": "raw",
                    "media": "text/html"
                  },
                  {
                    "kind": "raw",
                    "media": "text/plain"
                  }
                ],
                "kind": "json",
                "media": "application/json"
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
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "get_location_weather",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/{location}",
              "segments": [
                {
                  "var": "id"
                }
              ],
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "location": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "location",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "London"
                  }
                ],
                "query": [
                  {
                    "name": "d",
                    "orig": "d",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "lang",
                    "orig": "lang",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "m",
                    "orig": "m",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "m",
                    "orig": "M",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "period",
                    "orig": "period",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "t",
                    "orig": "T",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "u",
                    "orig": "u",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "alternatives": [
                  {
                    "kind": "raw",
                    "media": "text/html"
                  },
                  {
                    "kind": "raw",
                    "media": "text/plain"
                  }
                ],
                "kind": "json",
                "media": "application/json"
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
              "kind": "http",
              "method": "GET",
              "orig": "/:help",
              "segments": [
                {
                  "lit": ":help"
                }
              ],
              "parts": [
                ":help"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "alternatives": [
                  {
                    "kind": "raw",
                    "media": "text/plain"
                  }
                ],
                "kind": "raw",
                "media": "text/html"
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
              "kind": "http",
              "method": "GET",
              "orig": "/{location}.png",
              "segments": [
                {
                  "lit": "{location}.png"
                }
              ],
              "parts": [
                "{location}.png"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "location",
                    "orig": "location",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "Paris.png"
                  }
                ]
              },
              "select": {
                "exist": [
                  "location"
                ]
              },
              "response": {
                "binary": true,
                "kind": "raw",
                "media": "image/png"
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
  config,
  FEATURE_PLUGINS,
}

