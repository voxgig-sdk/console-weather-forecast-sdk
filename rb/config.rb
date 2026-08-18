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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "d",
                        "orig" => "d",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "1",
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "fr",
                        "kind" => "query",
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "m",
                        "orig" => "m",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "m",
                        "orig" => "m",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "period",
                        "orig" => "period",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "t",
                        "orig" => "t",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "u",
                        "orig" => "u",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "parts" => [],
                  "select" => {
                    "exist" => [
                      "d",
                      "format",
                      "lang",
                      "m",
                      "period",
                      "t",
                      "u",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
          "fields" => [],
          "name" => "get_location_weather",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "London",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "location",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "d",
                        "orig" => "d",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "m",
                        "orig" => "m",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "m",
                        "orig" => "m",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "period",
                        "orig" => "period",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "t",
                        "orig" => "t",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "u",
                        "orig" => "u",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{location}",
                  "parts" => [
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "location" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/:help",
                  "parts" => [
                    ":help",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
                  "args" => {
                    "params" => [
                      {
                        "example" => "Paris.png",
                        "kind" => "param",
                        "name" => "location",
                        "orig" => "location",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{location}.png",
                  "parts" => [
                    "{location}.png",
                  ],
                  "select" => {
                    "exist" => [
                      "location",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
