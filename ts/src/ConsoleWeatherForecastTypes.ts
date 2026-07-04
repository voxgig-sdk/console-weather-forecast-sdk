// Typed models for the ConsoleWeatherForecast SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetCurrentLocationWeather {
}

export type GetCurrentLocationWeatherLoadMatch = Partial<GetCurrentLocationWeather>

export interface GetLocationWeather {
}

export interface GetLocationWeatherLoadMatch {
  id: string
}

export interface Help {
}

export type HelpLoadMatch = Partial<Help>

export interface Location {
}

export interface LocationLoadMatch {
  location: string
}

