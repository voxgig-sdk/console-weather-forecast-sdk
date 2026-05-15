# ConsoleWeatherForecast SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ConsoleWeatherForecastUtility.registrar = ->(u) {
  u.clean = ConsoleWeatherForecastUtilities::Clean
  u.done = ConsoleWeatherForecastUtilities::Done
  u.make_error = ConsoleWeatherForecastUtilities::MakeError
  u.feature_add = ConsoleWeatherForecastUtilities::FeatureAdd
  u.feature_hook = ConsoleWeatherForecastUtilities::FeatureHook
  u.feature_init = ConsoleWeatherForecastUtilities::FeatureInit
  u.fetcher = ConsoleWeatherForecastUtilities::Fetcher
  u.make_fetch_def = ConsoleWeatherForecastUtilities::MakeFetchDef
  u.make_context = ConsoleWeatherForecastUtilities::MakeContext
  u.make_options = ConsoleWeatherForecastUtilities::MakeOptions
  u.make_request = ConsoleWeatherForecastUtilities::MakeRequest
  u.make_response = ConsoleWeatherForecastUtilities::MakeResponse
  u.make_result = ConsoleWeatherForecastUtilities::MakeResult
  u.make_point = ConsoleWeatherForecastUtilities::MakePoint
  u.make_spec = ConsoleWeatherForecastUtilities::MakeSpec
  u.make_url = ConsoleWeatherForecastUtilities::MakeUrl
  u.param = ConsoleWeatherForecastUtilities::Param
  u.prepare_auth = ConsoleWeatherForecastUtilities::PrepareAuth
  u.prepare_body = ConsoleWeatherForecastUtilities::PrepareBody
  u.prepare_headers = ConsoleWeatherForecastUtilities::PrepareHeaders
  u.prepare_method = ConsoleWeatherForecastUtilities::PrepareMethod
  u.prepare_params = ConsoleWeatherForecastUtilities::PrepareParams
  u.prepare_path = ConsoleWeatherForecastUtilities::PreparePath
  u.prepare_query = ConsoleWeatherForecastUtilities::PrepareQuery
  u.result_basic = ConsoleWeatherForecastUtilities::ResultBasic
  u.result_body = ConsoleWeatherForecastUtilities::ResultBody
  u.result_headers = ConsoleWeatherForecastUtilities::ResultHeaders
  u.transform_request = ConsoleWeatherForecastUtilities::TransformRequest
  u.transform_response = ConsoleWeatherForecastUtilities::TransformResponse
}
