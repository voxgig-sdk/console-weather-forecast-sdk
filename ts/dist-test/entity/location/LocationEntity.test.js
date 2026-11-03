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
(0, node_test_1.describe)('LocationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CONSOLE_WEATHER_FORECAST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CONSOLE_WEATHER_FORECAST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ConsoleWeatherForecastSDK.test();
        const ent = testsdk.Location();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ConsoleWeatherForecastSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Location().load({ "location": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CONSOLE_WEATHER_FORECAST_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'location.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "location", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /{location}.png", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "Paris.png", "k": "param", "n": "location", "or": "location", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/{location}.png", "q": { "exist": ["location"] }, "r": {}, "rs": { "binary": true, "kind": "raw", "media": "image/png" }, "s": [{ "lit": "{location}.png" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "location", "name__orig": "location", "Name": "Location", "name_": "location", "name-": "location", "NAME": "LOCATION", "index$": 3 }, { "active": true, "entity": "location", "key$": "BasicLocationFlow", "kind": "basic", "name": "BasicLocationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "location_ref01", "srcdatavar": "location_ref01_data", "suffix": "_dt0" }, "m": { "location": "location01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-location_ref01" } }], "index$": 0 }] }, 'Location', { "GET /{location}.png": { "protocol": "http", "parameters": [{ "name": "location", "in": "path", "description": "Location name with options separated by underscores (e.g., 'Paris_0tqp_lang=fr'). Options include: t=transparency, 0=no frame, q=quiet, p=no-precipitation, lang=language", "required": true, "schema": { "type": "string" }, "examples": { "simple": { "value": "Paris.png", "summary": "Simple PNG for Paris" }, "withOptions": { "value": "Paris_0tqp_lang=fr.png", "summary": "PNG with options" }, "transparent": { "value": "Oymyakon_tqp0.png", "summary": "Transparent PNG" } }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let location_ref01_data = Object.values(setup.data.existing.location)[0];
        // LOAD
        const location_ref01_ent = client.Location();
        const location_ref01_match_dt0 = {};
        location_ref01_match_dt0['location'] = setup.idmap['location'] ?? setup.idmap['location01'];
        const location_ref01_data_dt0 = (await location_ref01_ent.load(location_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != location_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/location/LocationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ConsoleWeatherForecastSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['location01', 'location02', 'location03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CONSOLE_WEATHER_FORECAST_TEST_LOCATION_ENTID': idmap,
        'CONSOLE_WEATHER_FORECAST_TEST_LIVE': 'FALSE',
        'CONSOLE_WEATHER_FORECAST_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CONSOLE_WEATHER_FORECAST_TEST_LOCATION_ENTID'];
    const live = 'TRUE' === env.CONSOLE_WEATHER_FORECAST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CONSOLE_WEATHER_FORECAST_TEST_LOCATION_ENTID'];
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
//# sourceMappingURL=LocationEntity.test.js.map