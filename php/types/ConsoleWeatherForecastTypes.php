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

/** Match filter for GetCurrentLocationWeather#load (any subset of GetCurrentLocationWeather fields). */
class GetCurrentLocationWeatherLoadMatch
{
}

/** GetLocationWeather entity data model. */
class GetLocationWeather
{
}

/** Request payload for GetLocationWeather#load. */
class GetLocationWeatherLoadMatch
{
    public string $id;
}

/** Help entity data model. */
class Help
{
}

/** Match filter for Help#load (any subset of Help fields). */
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

