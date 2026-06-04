# ConsoleWeatherForecast SDK

Console-friendly weather forecasts you can curl from a terminal, with ANSI, plain text, HTML, PNG, JSON, or Prometheus output

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Console Weather Forecast

[wttr.in](https://wttr.in) is a console-oriented weather forecast service created by [Igor Chubin](https://github.com/chubin). It is designed to be queried with command-line HTTP clients such as `curl`, `httpie`, or `wget`, and it picks an output representation based on the User-Agent: ANSI-coloured text for terminals, HTML for browsers, or PNG for graphical viewers.

What you get from the API:
- Current conditions plus a multi-day forecast broken down by morning, noon, evening, and night.
- Temperature, wind speed and direction, precipitation, visibility, and humidity, in USCS or metric units (`?u`, `?m`, `?M`).
- Multiple output formats: ANSI, plain text (`?T`), PNG (append `.png`), JSON (`?format=j1` / `j2`), one-line summaries (`?format=1..4`), Prometheus metrics (`?format=p1`), and data-rich or map views (`?format=v2`, `v3`).
- Moon phase queries via `/Moon` or `/Moon@YYYY-MM-DD`.
- Localised output in around 74 languages via `?lang=` or language subdomains like `de.wttr.in`.

Locations can be supplied as a city name (`/London`), a 3-letter IATA airport code (`/muc`), a landmark (`/Eiffel+Tower`), a domain prefixed with `@` (`/@github.com`), or an IP address. Omitting the location returns weather for the caller's detected location. The service does not require an API key, CORS is enabled, and a fallback domain `wttr.is` is available.

## Try it

**TypeScript**
```bash
npm install console-weather-forecast
```

**Python**
```bash
pip install console-weather-forecast-sdk
```

**PHP**
```bash
composer require voxgig/console-weather-forecast-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/console-weather-forecast-sdk/go
```

**Ruby**
```bash
gem install console-weather-forecast-sdk
```

**Lua**
```bash
luarocks install console-weather-forecast-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ConsoleWeatherForecastSDK } from 'console-weather-forecast'

const client = new ConsoleWeatherForecastSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o console-weather-forecast-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "console-weather-forecast": {
      "command": "/abs/path/to/console-weather-forecast-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **GetCurrentLocationWeather** | Weather for the caller's auto-detected location, returned by requesting the API root `/` (with optional `?format=` to pick text, JSON, or Prometheus output). | `/` |
| **GetLocationWeather** | Weather for an explicit place at `/{location}` — accepts city names, IATA codes, landmarks, `@domain` lookups, or IP addresses, with units and formatting controlled via query parameters such as `?m`, `?u`, `?lang=`, and `?format=`. | `/{location}` |
| **Help** | The built-in usage reference served at `/:help`, documenting URL patterns, query flags, and output formats. | `/:help` |
| **Location** | A resolvable place identifier used as the path segment in `/{location}` requests — covering cities, airports, landmarks, geographic coordinates, and special targets like `Moon`. | `/{location}.png` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from consoleweatherforecast_sdk import ConsoleWeatherForecastSDK

client = ConsoleWeatherForecastSDK({})


# Load a specific getcurrentlocationweather
getcurrentlocationweather, err = client.GetCurrentLocationWeather(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'consoleweatherforecast_sdk.php';

$client = new ConsoleWeatherForecastSDK([]);


// Load a specific getcurrentlocationweather
[$getcurrentlocationweather, $err] = $client->GetCurrentLocationWeather(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/console-weather-forecast-sdk/go"

client := sdk.NewConsoleWeatherForecastSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "ConsoleWeatherForecast_sdk"

client = ConsoleWeatherForecastSDK.new({})


# Load a specific getcurrentlocationweather
getcurrentlocationweather, err = client.GetCurrentLocationWeather(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("console-weather-forecast_sdk")

local client = sdk.new({})


-- Load a specific getcurrentlocationweather
local getcurrentlocationweather, err = client:GetCurrentLocationWeather(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ConsoleWeatherForecastSDK.test()
const result = await client.GetCurrentLocationWeather().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ConsoleWeatherForecastSDK.test(None, None)
result, err = client.GetCurrentLocationWeather(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ConsoleWeatherForecastSDK::test(null, null);
[$result, $err] = $client->GetCurrentLocationWeather(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetCurrentLocationWeather(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ConsoleWeatherForecastSDK.test(nil, nil)
result, err = client.GetCurrentLocationWeather(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetCurrentLocationWeather(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Console Weather Forecast

- Upstream: [https://wttr.in](https://wttr.in)
- API docs: [https://github.com/chubin/wttr.in](https://github.com/chubin/wttr.in)

- Source code is released under the Apache License 2.0.
- Weather data is sourced from upstream providers (notably the [wego](https://github.com/schachmat/wego) weather client) and remains subject to their own terms.
- Attribution to the upstream project ([chubin/wttr.in](https://github.com/chubin/wttr.in)) is appreciated when redistributing output.

---

Generated from the Console Weather Forecast OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
