# ConsoleWeatherForecast SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ConsoleWeatherForecast",
            "slug": "console-weather-forecast",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://wttr.in",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_current_location_weather": {},
                "get_location_weather": {},
                "help": {},
                "location": {},
            },
        },
        "entity": {
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
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "d",
                      "orig": "d",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "1",
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "fr",
                    },
                    {
                      "name": "m",
                      "orig": "m",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "m",
                      "orig": "m",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "period",
                      "orig": "period",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "t",
                      "orig": "t",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "u",
                      "orig": "u",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "d",
                    "format",
                    "lang",
                    "m",
                    "period",
                    "t",
                    "u",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_location_weather": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "var": "id",
                  },
                ],
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "location": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "location",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "London",
                    },
                  ],
                  "query": [
                    {
                      "name": "d",
                      "orig": "d",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "m",
                      "orig": "m",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "m",
                      "orig": "m",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "period",
                      "orig": "period",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "t",
                      "orig": "t",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "u",
                      "orig": "u",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
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
                    "u",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": ":help",
                  },
                ],
                "parts": [
                  ":help",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                    "lit": "{location}.png",
                  },
                ],
                "parts": [
                  "{location}.png",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "location",
                      "orig": "location",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "Paris.png",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "location",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
