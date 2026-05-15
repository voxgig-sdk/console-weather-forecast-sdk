package voxgigconsoleweatherforecastsdk

import (
	"github.com/voxgig-sdk/console-weather-forecast-sdk/core"
	"github.com/voxgig-sdk/console-weather-forecast-sdk/entity"
	"github.com/voxgig-sdk/console-weather-forecast-sdk/feature"
	_ "github.com/voxgig-sdk/console-weather-forecast-sdk/utility"
)

// Type aliases preserve external API.
type ConsoleWeatherForecastSDK = core.ConsoleWeatherForecastSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ConsoleWeatherForecastEntity = core.ConsoleWeatherForecastEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ConsoleWeatherForecastError = core.ConsoleWeatherForecastError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetCurrentLocationWeatherEntityFunc = func(client *core.ConsoleWeatherForecastSDK, entopts map[string]any) core.ConsoleWeatherForecastEntity {
		return entity.NewGetCurrentLocationWeatherEntity(client, entopts)
	}
	core.NewGetLocationWeatherEntityFunc = func(client *core.ConsoleWeatherForecastSDK, entopts map[string]any) core.ConsoleWeatherForecastEntity {
		return entity.NewGetLocationWeatherEntity(client, entopts)
	}
	core.NewHelpEntityFunc = func(client *core.ConsoleWeatherForecastSDK, entopts map[string]any) core.ConsoleWeatherForecastEntity {
		return entity.NewHelpEntity(client, entopts)
	}
	core.NewLocationEntityFunc = func(client *core.ConsoleWeatherForecastSDK, entopts map[string]any) core.ConsoleWeatherForecastEntity {
		return entity.NewLocationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewConsoleWeatherForecastSDK = core.NewConsoleWeatherForecastSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
