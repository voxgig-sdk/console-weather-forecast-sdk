package core

type ConsoleWeatherForecastError struct {
	IsConsoleWeatherForecastError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewConsoleWeatherForecastError(code string, msg string, ctx *Context) *ConsoleWeatherForecastError {
	return &ConsoleWeatherForecastError{
		IsConsoleWeatherForecastError: true,
		Sdk:              "ConsoleWeatherForecast",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ConsoleWeatherForecastError) Error() string {
	return e.Msg
}
