-- Typed models for the ConsoleWeatherForecast SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetCurrentLocationWeather

---@class GetCurrentLocationWeatherLoadMatch
---@field d? string
---@field format? string
---@field lang? string
---@field m? string
---@field period? number
---@field t? string
---@field u? string

---@class GetLocationWeather
---@field id? string

---@class GetLocationWeatherLoadMatch
---@field id string
---@field d? string
---@field format? string
---@field lang? string
---@field m? string
---@field period? number
---@field t? string
---@field u? string

---@class Help

---@class HelpLoadMatch

---@class Location

---@class LocationLoadMatch
---@field location string

local M = {}

return M
