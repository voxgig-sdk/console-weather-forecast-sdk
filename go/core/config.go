package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ConsoleWeatherForecast",
			"slug": "console-weather-forecast",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://wttr.in",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_current_location_weather": map[string]any{},
				"get_location_weather": map[string]any{},
				"help": map[string]any{},
				"location": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_current_location_weather": map[string]any{
				"fields": []any{},
				"name": "get_current_location_weather",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "d",
											"orig": "d",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "1",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "fr",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "m",
											"orig": "m",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "m",
											"orig": "m",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "period",
											"orig": "period",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "t",
											"orig": "t",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "u",
											"orig": "u",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{
									"exist": []any{
										"d",
										"format",
										"lang",
										"m",
										"period",
										"t",
										"u",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_location_weather": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"name": "get_location_weather",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "London",
											"kind": "param",
											"name": "id",
											"orig": "location",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "d",
											"orig": "d",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "m",
											"orig": "m",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "m",
											"orig": "m",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "period",
											"orig": "period",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "t",
											"orig": "t",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "u",
											"orig": "u",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{location}",
								"parts": []any{
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"location": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"d",
										"format",
										"id",
										"lang",
										"m",
										"period",
										"t",
										"u",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"help": map[string]any{
				"fields": []any{},
				"name": "help",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/:help",
								"parts": []any{
									":help",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"location": map[string]any{
				"fields": []any{},
				"name": "location",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "Paris.png",
											"kind": "param",
											"name": "location",
											"orig": "location",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{location}.png",
								"parts": []any{
									"{location}.png",
								},
								"select": map[string]any{
									"exist": []any{
										"location",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
