<?php
declare(strict_types=1);

// ConsoleWeatherForecast SDK utility: prepare_body

class ConsoleWeatherForecastPrepareBody
{
    public static function call(ConsoleWeatherForecastContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
