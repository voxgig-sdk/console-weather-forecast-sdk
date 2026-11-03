package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/console-weather-forecast-sdk/go"
	"github.com/voxgig-sdk/console-weather-forecast-sdk/go/core"

	vs "github.com/voxgig-sdk/console-weather-forecast-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const get_location_weatherEntityLiveStrict = true


func TestGetLocationWeatherEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetLocationWeather(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetLocationWeatherEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.GetLocationWeather(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ConsoleWeatherForecastError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := get_location_weatherBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_location_weather." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"get_location_weather01": "London"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, get_location_weatherEntityLiveStrict, setup.data, "get_location_weather", func() (any, error) {
				return []any{map[string]any{"id": setup.idmap["get_location_weather01"]}}, nil
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		getLocationWeatherRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.get_location_weather")))
		var getLocationWeatherRef01Data map[string]any
		if len(getLocationWeatherRef01DataRaw) > 0 {
			getLocationWeatherRef01Data = core.ToMapAny(getLocationWeatherRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getLocationWeatherRef01Data

		// LOAD
		getLocationWeatherRef01Ent := client.GetLocationWeather(nil)
		getLocationWeatherRef01MatchDt0 := map[string]any{
			"id": getLocationWeatherRef01Data["id"],
		}
		getLocationWeatherRef01DataDt0Loaded, err := getLocationWeatherRef01Ent.Load(getLocationWeatherRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		getLocationWeatherRef01DataDt0LoadResult := core.ToMapAny(entityData(getLocationWeatherRef01DataDt0Loaded))
		if getLocationWeatherRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if getLocationWeatherRef01DataDt0LoadResult["id"] != getLocationWeatherRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func get_location_weatherBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_location_weather", "GetLocationWeatherTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_location_weather test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_location_weather test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"get_location_weather01", "get_location_weather02", "get_location_weather03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("CONSOLE_WEATHER_FORECAST_TEST_GET_LOCATION_WEATHER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CONSOLE_WEATHER_FORECAST_TEST_GET_LOCATION_WEATHER_ENTID": idmap,
		"CONSOLE_WEATHER_FORECAST_TEST_LIVE":      "FALSE",
		"CONSOLE_WEATHER_FORECAST_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["CONSOLE_WEATHER_FORECAST_TEST_GET_LOCATION_WEATHER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CONSOLE_WEATHER_FORECAST_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewConsoleWeatherForecastSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CONSOLE_WEATHER_FORECAST_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CONSOLE_WEATHER_FORECAST_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
