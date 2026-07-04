# ConsoleWeatherForecast PHP SDK Reference

Complete API reference for the ConsoleWeatherForecast PHP SDK.


## ConsoleWeatherForecastSDK

### Constructor

```php
require_once __DIR__ . '/console-weather-forecast_sdk.php';

$client = new ConsoleWeatherForecastSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ConsoleWeatherForecastSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ConsoleWeatherForecastSDK::test();
```


### Instance Methods

#### `GetCurrentLocationWeather($data = null)`

Create a new `GetCurrentLocationWeatherEntity` instance. Pass `null` for no initial data.

#### `GetLocationWeather($data = null)`

Create a new `GetLocationWeatherEntity` instance. Pass `null` for no initial data.

#### `Help($data = null)`

Create a new `HelpEntity` instance. Pass `null` for no initial data.

#### `Location($data = null)`

Create a new `LocationEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## GetCurrentLocationWeatherEntity

```php
$get_current_location_weather = $client->GetCurrentLocationWeather();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetCurrentLocationWeather()->load(["id" => "get_current_location_weather_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetCurrentLocationWeatherEntity`

Create a new `GetCurrentLocationWeatherEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetLocationWeatherEntity

```php
$get_location_weather = $client->GetLocationWeather();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetLocationWeather()->load(["id" => "get_location_weather_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetLocationWeatherEntity`

Create a new `GetLocationWeatherEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## HelpEntity

```php
$help = $client->Help();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Help()->load(["id" => "help_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): HelpEntity`

Create a new `HelpEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LocationEntity

```php
$location = $client->Location();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Location()->load(["id" => "location_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LocationEntity`

Create a new `LocationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ConsoleWeatherForecastSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

