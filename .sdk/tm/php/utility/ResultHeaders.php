<?php
declare(strict_types=1);

// ConsoleWeatherForecast SDK utility: result_headers

class ConsoleWeatherForecastResultHeaders
{
    public static function call(ConsoleWeatherForecastContext $ctx): ?ConsoleWeatherForecastResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
