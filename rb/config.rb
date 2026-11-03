# ConsoleWeatherForecast SDK configuration

module ConsoleWeatherForecastConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ConsoleWeatherForecast",
        "slug" => "console-weather-forecast",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://wttr.in",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_current_location_weather" => {},
          "get_location_weather" => {},
          "help" => {},
          "location" => {},
        },
      },
      "entity" => {
        "get_current_location_weather" => {
          "fields" => [],
          "name" => "get_current_location_weather",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "segments" => [],
                  "parts" => [],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "d",
                        "orig" => "d",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "1",
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "fr",
                      },
                      {
                        "name" => "m",
                        "orig" => "m",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "m",
                        "orig" => "M",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "period",
                        "orig" => "period",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "t",
                        "orig" => "T",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "u",
                        "orig" => "u",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "alternatives" => [
                      {
                        "kind" => "raw",
                        "media" => "text/html",
                      },
                      {
                        "kind" => "raw",
                        "media" => "text/plain",
                      },
                    ],
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_location_weather" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "get_location_weather",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{location}",
                  "segments" => [
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "location" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "location",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "London",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "d",
                        "orig" => "d",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "m",
                        "orig" => "m",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "m",
                        "orig" => "M",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "period",
                        "orig" => "period",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "t",
                        "orig" => "T",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "u",
                        "orig" => "u",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "alternatives" => [
                      {
                        "kind" => "raw",
                        "media" => "text/html",
                      },
                      {
                        "kind" => "raw",
                        "media" => "text/plain",
                      },
                    ],
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "help" => {
          "fields" => [],
          "name" => "help",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/:help",
                  "segments" => [
                    {
                      "lit" => ":help",
                    },
                  ],
                  "parts" => [
                    ":help",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "alternatives" => [
                      {
                        "kind" => "raw",
                        "media" => "text/plain",
                      },
                    ],
                    "kind" => "raw",
                    "media" => "text/html",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "location" => {
          "fields" => [],
          "name" => "location",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{location}.png",
                  "segments" => [
                    {
                      "lit" => "{location}.png",
                    },
                  ],
                  "parts" => [
                    "{location}.png",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "location",
                        "orig" => "location",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "Paris.png",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "location",
                    ],
                  },
                  "response" => {
                    "binary" => true,
                    "kind" => "raw",
                    "media" => "image/png",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ConsoleWeatherForecastFeatures.make_feature(name)
  end
end
