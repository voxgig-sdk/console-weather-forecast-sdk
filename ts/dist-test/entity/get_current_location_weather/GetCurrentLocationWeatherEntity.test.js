"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetCurrentLocationWeatherEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CONSOLE_WEATHER_FORECAST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CONSOLE_WEATHER_FORECAST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ConsoleWeatherForecastSDK.test();
        const ent = testsdk.GetCurrentLocationWeather();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CONSOLE_WEATHER_FORECAST_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_current_location_weather.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "get_current_location_weather", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "d", "or": "d", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "1", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "fr", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "m", "or": "m", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "m", "or": "m", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "period", "or": "period", "r": false, "t": "`$INTEGER`", "index$": 5 }, { "a": true, "k": "query", "n": "t", "or": "t", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "k": "query", "n": "u", "or": "u", "r": false, "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/", "q": { "exist": ["d", "format", "lang", "m", "period", "t", "u"] }, "r": {}, "s": [], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_current_location_weather", "name__orig": "get_current_location_weather", "Name": "GetCurrentLocationWeather", "name_": "get_current_location_weather", "name-": "get-current-location-weather", "NAME": "GET_CURRENT_LOCATION_WEATHER", "index$": 0 }, { "active": true, "entity": "get_current_location_weather", "key$": "BasicGetCurrentLocationWeatherFlow", "kind": "basic", "name": "BasicGetCurrentLocationWeatherFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "get_current_location_weather_ref01", "srcdatavar": "get_current_location_weather_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_current_location_weather_ref01" } }], "index$": 0 }] }, 'GetCurrentLocationWeather', { "GET /": { "protocol": "http", "operationId": "getCurrentLocationWeather", "responses": { "200": { "description": "Successful weather forecast response", "content": { "text/plain": { "schema": { "type": "string", "description": "ANSI-formatted weather forecast for terminal display" }, "example": "Weather for City: Paris, France\n\n     \\   /     Clear\n      .-.      10 – 11 °C\n   ― (   ) ―   ↑ 11 km/h\n      `-'      10 km\n     /   \\     0.0 mm" }, "text/html": { "schema": { "type": "string", "description": "HTML-formatted weather forecast for web browsers" } }, "application/json": { "schema": { "type": "object", "description": "JSON-formatted weather data" } } } } }, "parameters": [{ "name": "u", "in": "query", "description": "Use USCS units (used by default in US)", "required": false, "schema": { "type": "string", "enum": [""] }, "index$": 0 }, { "name": "m", "in": "query", "description": "Use metric (SI) units (used by default everywhere except US)", "required": false, "schema": { "type": "string", "enum": [""] }, "index$": 1 }, { "name": "M", "in": "query", "description": "Use metric (SI) units, but show wind speed in m/s", "required": false, "schema": { "type": "string", "enum": [""] }, "index$": 2 }, { "name": "format", "in": "query", "description": "Output format for one-line display. Supports formats 1-4 or custom format using %-notation", "required": false, "schema": { "type": "string" }, "examples": { "format1": { "value": "1", "summary": "Current weather: 🌦 +11⁰C" }, "format2": { "value": "2", "summary": "Weather with details: 🌦 🌡️+11°C 🌬️↓4km/h" }, "format3": { "value": "3", "summary": "Location and weather: Nuremberg: 🌦 +11⁰C" }, "format4": { "value": "4", "summary": "Location and weather with details: Nuremberg: 🌦 🌡️+11°C 🌬️↓4km/h" }, "custom": { "value": "%l:+%c+%t", "summary": "Custom format using %-notation" } }, "index$": 3 }, { "name": "T", "in": "query", "description": "Force plain text output (disables colors)", "required": false, "schema": { "type": "string", "enum": [""] }, "index$": 4 }, { "name": "d", "in": "query", "description": "Restrict output to glyphs available in standard console fonts", "required": false, "schema": { "type": "string", "enum": [""] }, "index$": 5 }, { "name": "lang", "in": "query", "description": "Language for the output", "required": false, "schema": { "type": "string" }, "examples": { "french": { "value": "fr" }, "german": { "value": "de" }, "ukrainian": { "value": "uk" } }, "index$": 6 }, { "name": "period", "in": "query", "description": "Update period in seconds for automatic queries", "required": false, "schema": { "type": "integer", "minimum": 1 }, "index$": 7 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_current_location_weather_ref01_data = Object.values(setup.data.existing.get_current_location_weather)[0];
        // LOAD
        const get_current_location_weather_ref01_ent = client.GetCurrentLocationWeather();
        const get_current_location_weather_ref01_match_dt0 = {};
        const get_current_location_weather_ref01_data_dt0 = (await get_current_location_weather_ref01_ent.load(get_current_location_weather_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != get_current_location_weather_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_current_location_weather/GetCurrentLocationWeatherTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ConsoleWeatherForecastSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_current_location_weather01', 'get_current_location_weather02', 'get_current_location_weather03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CONSOLE_WEATHER_FORECAST_TEST_GET_CURRENT_LOCATION_WEATHER_ENTID': idmap,
        'CONSOLE_WEATHER_FORECAST_TEST_LIVE': 'FALSE',
        'CONSOLE_WEATHER_FORECAST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CONSOLE_WEATHER_FORECAST_TEST_GET_CURRENT_LOCATION_WEATHER_ENTID'];
    const live = 'TRUE' === env.CONSOLE_WEATHER_FORECAST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CONSOLE_WEATHER_FORECAST_TEST_GET_CURRENT_LOCATION_WEATHER_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ConsoleWeatherForecastSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CONSOLE_WEATHER_FORECAST_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=GetCurrentLocationWeatherEntity.test.js.map