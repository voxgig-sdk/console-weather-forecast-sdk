# Typed models for the ConsoleWeatherForecast SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GetCurrentLocationWeather:
    pass


@dataclass
class GetCurrentLocationWeatherLoadMatch:
    pass


@dataclass
class GetLocationWeather:
    pass


@dataclass
class GetLocationWeatherLoadMatch:
    id: str


@dataclass
class Help:
    pass


@dataclass
class HelpLoadMatch:
    pass


@dataclass
class Location:
    pass


@dataclass
class LocationLoadMatch:
    location: str

