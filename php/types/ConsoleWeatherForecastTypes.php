<?php
declare(strict_types=1);

// Typed models for the ConsoleWeatherForecast SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GetCurrentLocationWeather entity data model. */
class GetCurrentLocationWeather
{
}

/** Request payload for GetCurrentLocationWeather#load. */
class GetCurrentLocationWeatherLoadMatch
{
    public ?string $d = null;
    public ?string $format = null;
    public ?string $lang = null;
    public ?string $m = null;
    public ?int $period = null;
    public ?string $t = null;
    public ?string $u = null;
}

/** GetLocationWeather entity data model. */
class GetLocationWeather
{
    public ?string $id = null;
}

/** Request payload for GetLocationWeather#load. */
class GetLocationWeatherLoadMatch
{
    public string $id;
    public ?string $d = null;
    public ?string $format = null;
    public ?string $lang = null;
    public ?string $m = null;
    public ?int $period = null;
    public ?string $t = null;
    public ?string $u = null;
}

/** Help entity data model. */
class Help
{
}

/** Request payload for Help#load. */
class HelpLoadMatch
{
}

/** Location entity data model. */
class Location
{
}

/** Request payload for Location#load. */
class LocationLoadMatch
{
    public string $location;
}

