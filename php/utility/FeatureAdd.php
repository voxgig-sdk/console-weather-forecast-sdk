<?php
declare(strict_types=1);

// ConsoleWeatherForecast SDK utility: feature_add

class ConsoleWeatherForecastFeatureAdd
{
    public static function call(ConsoleWeatherForecastContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
