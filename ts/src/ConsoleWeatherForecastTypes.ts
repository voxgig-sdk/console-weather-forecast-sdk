// Typed models for the ConsoleWeatherForecast SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetCurrentLocationWeather {
}

export interface GetCurrentLocationWeatherLoadMatch {
  d?: string
  format?: string
  lang?: string
  m?: string
  period?: number
  t?: string
  u?: string
}

export interface GetLocationWeather {
  id?: string
}

export interface GetLocationWeatherLoadMatch {
  id: string
  d?: string
  format?: string
  lang?: string
  m?: string
  period?: number
  t?: string
  u?: string
}

export interface Help {
}

export interface HelpLoadMatch {
}

export interface Location {
}

export interface LocationLoadMatch {
  location: string
}

