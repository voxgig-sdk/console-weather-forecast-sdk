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

func TestGetCurrentLocationWeatherEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetCurrentLocationWeather(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetCurrentLocationWeatherEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_current_location_weatherBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_current_location_weather." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CONSOLEWEATHERFORECAST_TEST_GET_CURRENT_LOCATION_WEATHER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getCurrentLocationWeatherRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_current_location_weather", setup.data)))
		var getCurrentLocationWeatherRef01Data map[string]any
		if len(getCurrentLocationWeatherRef01DataRaw) > 0 {
			getCurrentLocationWeatherRef01Data = core.ToMapAny(getCurrentLocationWeatherRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getCurrentLocationWeatherRef01Data

		// LOAD
		getCurrentLocationWeatherRef01Ent := client.GetCurrentLocationWeather(nil)
		getCurrentLocationWeatherRef01MatchDt0 := map[string]any{}
		getCurrentLocationWeatherRef01DataDt0Loaded, err := getCurrentLocationWeatherRef01Ent.Load(getCurrentLocationWeatherRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if getCurrentLocationWeatherRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func get_current_location_weatherBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_current_location_weather", "GetCurrentLocationWeatherTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_current_location_weather test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_current_location_weather test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_current_location_weather01", "get_current_location_weather02", "get_current_location_weather03"},
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
	entidEnvRaw := os.Getenv("CONSOLEWEATHERFORECAST_TEST_GET_CURRENT_LOCATION_WEATHER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CONSOLEWEATHERFORECAST_TEST_GET_CURRENT_LOCATION_WEATHER_ENTID": idmap,
		"CONSOLEWEATHERFORECAST_TEST_LIVE":      "FALSE",
		"CONSOLEWEATHERFORECAST_TEST_EXPLAIN":   "FALSE",
		"CONSOLEWEATHERFORECAST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CONSOLEWEATHERFORECAST_TEST_GET_CURRENT_LOCATION_WEATHER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CONSOLEWEATHERFORECAST_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["CONSOLEWEATHERFORECAST_APIKEY"],
			},
			extra,
		})
		client = sdk.NewConsoleWeatherForecastSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CONSOLEWEATHERFORECAST_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CONSOLEWEATHERFORECAST_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
