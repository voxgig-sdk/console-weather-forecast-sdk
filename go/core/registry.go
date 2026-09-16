package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGetCurrentLocationWeatherEntityFunc func(client *ConsoleWeatherForecastSDK, entopts map[string]any) ConsoleWeatherForecastEntity

var NewGetLocationWeatherEntityFunc func(client *ConsoleWeatherForecastSDK, entopts map[string]any) ConsoleWeatherForecastEntity

var NewHelpEntityFunc func(client *ConsoleWeatherForecastSDK, entopts map[string]any) ConsoleWeatherForecastEntity

var NewLocationEntityFunc func(client *ConsoleWeatherForecastSDK, entopts map[string]any) ConsoleWeatherForecastEntity

