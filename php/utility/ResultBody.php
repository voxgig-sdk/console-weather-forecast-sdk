<?php
declare(strict_types=1);

// ConsoleWeatherForecast SDK utility: result_body

class ConsoleWeatherForecastResultBody
{
    public static function call(ConsoleWeatherForecastContext $ctx): ?ConsoleWeatherForecastResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
