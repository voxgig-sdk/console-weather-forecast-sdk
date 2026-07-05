# frozen_string_literal: true

# Typed models for the ConsoleWeatherForecast SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetCurrentLocationWeather entity data model.
class GetCurrentLocationWeather
end

# Request payload for GetCurrentLocationWeather#load.
class GetCurrentLocationWeatherLoadMatch
end

# GetLocationWeather entity data model.
class GetLocationWeather
end

# Request payload for GetLocationWeather#load.
#
# @!attribute [rw] id
#   @return [String]
GetLocationWeatherLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Help entity data model.
class Help
end

# Request payload for Help#load.
class HelpLoadMatch
end

# Location entity data model.
class Location
end

# Request payload for Location#load.
#
# @!attribute [rw] location
#   @return [String]
LocationLoadMatch = Struct.new(
  :location,
  keyword_init: true
)

