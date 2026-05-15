<?php
declare(strict_types=1);

// ConsoleWeatherForecast SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ConsoleWeatherForecastMakeContext
{
    public static function call(array $ctxmap, ?ConsoleWeatherForecastContext $basectx): ConsoleWeatherForecastContext
    {
        return new ConsoleWeatherForecastContext($ctxmap, $basectx);
    }
}
