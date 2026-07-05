// Typed models for the ConsoleWeatherForecast SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// GetCurrentLocationWeather is the typed data model for the get_current_location_weather entity.
type GetCurrentLocationWeather struct {
}

// GetCurrentLocationWeatherLoadMatch is the typed request payload for GetCurrentLocationWeather.LoadTyped.
type GetCurrentLocationWeatherLoadMatch struct {
}

// GetLocationWeather is the typed data model for the get_location_weather entity.
type GetLocationWeather struct {
}

// GetLocationWeatherLoadMatch is the typed request payload for GetLocationWeather.LoadTyped.
type GetLocationWeatherLoadMatch struct {
	Id string `json:"id"`
}

// Help is the typed data model for the help entity.
type Help struct {
}

// HelpLoadMatch is the typed request payload for Help.LoadTyped.
type HelpLoadMatch struct {
}

// Location is the typed data model for the location entity.
type Location struct {
}

// LocationLoadMatch is the typed request payload for Location.LoadTyped.
type LocationLoadMatch struct {
	Location string `json:"location"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
