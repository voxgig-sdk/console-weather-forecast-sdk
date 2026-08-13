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

func TestGetLocationWeatherEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetLocationWeather(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetLocationWeatherEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
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
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CONSOLE_WEATHER_FORECAST_TEST_GET_LOCATION_WEATHER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getLocationWeatherRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_location_weather", setup.data)))
		var getLocationWeatherRef01Data map[string]any
		if len(getLocationWeatherRef01DataRaw) > 0 {
			getLocationWeatherRef01Data = core.ToMapAny(getLocationWeatherRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getLocationWeatherRef01Data

		// LOAD
		getLocationWeatherRef01Ent := client.GetLocationWeather(nil)
		getLocationWeatherRef01MatchDt0 := map[string]any{}
		getLocationWeatherRef01DataDt0Loaded, err := getLocationWeatherRef01Ent.Load(getLocationWeatherRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if getLocationWeatherRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
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
	idmap := vs.Transform(
		[]any{"get_location_weather01", "get_location_weather02", "get_location_weather03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
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
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
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
