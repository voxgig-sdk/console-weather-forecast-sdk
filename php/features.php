<?php
declare(strict_types=1);

// ConsoleWeatherForecast SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ConsoleWeatherForecastFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ConsoleWeatherForecastBaseFeature();
            case "test":
                return new ConsoleWeatherForecastTestFeature();
            default:
                return new ConsoleWeatherForecastBaseFeature();
        }
    }
}
