<?php
declare(strict_types=1);

// ConsoleWeatherForecast SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ConsoleWeatherForecastUtility::setRegistrar(function (ConsoleWeatherForecastUtility $u): void {
    $u->clean = [ConsoleWeatherForecastClean::class, 'call'];
    $u->done = [ConsoleWeatherForecastDone::class, 'call'];
    $u->make_error = [ConsoleWeatherForecastMakeError::class, 'call'];
    $u->feature_add = [ConsoleWeatherForecastFeatureAdd::class, 'call'];
    $u->feature_hook = [ConsoleWeatherForecastFeatureHook::class, 'call'];
    $u->feature_init = [ConsoleWeatherForecastFeatureInit::class, 'call'];
    $u->fetcher = [ConsoleWeatherForecastFetcher::class, 'call'];
    $u->make_fetch_def = [ConsoleWeatherForecastMakeFetchDef::class, 'call'];
    $u->make_context = [ConsoleWeatherForecastMakeContext::class, 'call'];
    $u->make_options = [ConsoleWeatherForecastMakeOptions::class, 'call'];
    $u->make_request = [ConsoleWeatherForecastMakeRequest::class, 'call'];
    $u->make_response = [ConsoleWeatherForecastMakeResponse::class, 'call'];
    $u->make_result = [ConsoleWeatherForecastMakeResult::class, 'call'];
    $u->make_point = [ConsoleWeatherForecastMakePoint::class, 'call'];
    $u->make_spec = [ConsoleWeatherForecastMakeSpec::class, 'call'];
    $u->make_url = [ConsoleWeatherForecastMakeUrl::class, 'call'];
    $u->param = [ConsoleWeatherForecastParam::class, 'call'];
    $u->prepare_auth = [ConsoleWeatherForecastPrepareAuth::class, 'call'];
    $u->prepare_body = [ConsoleWeatherForecastPrepareBody::class, 'call'];
    $u->prepare_headers = [ConsoleWeatherForecastPrepareHeaders::class, 'call'];
    $u->prepare_method = [ConsoleWeatherForecastPrepareMethod::class, 'call'];
    $u->prepare_params = [ConsoleWeatherForecastPrepareParams::class, 'call'];
    $u->prepare_path = [ConsoleWeatherForecastPreparePath::class, 'call'];
    $u->prepare_query = [ConsoleWeatherForecastPrepareQuery::class, 'call'];
    $u->result_basic = [ConsoleWeatherForecastResultBasic::class, 'call'];
    $u->result_body = [ConsoleWeatherForecastResultBody::class, 'call'];
    $u->result_headers = [ConsoleWeatherForecastResultHeaders::class, 'call'];
    $u->transform_request = [ConsoleWeatherForecastTransformRequest::class, 'call'];
    $u->transform_response = [ConsoleWeatherForecastTransformResponse::class, 'call'];
});
