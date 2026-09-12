import { GetCurrentLocationWeatherEntity } from './entity/GetCurrentLocationWeatherEntity';
import { GetLocationWeatherEntity } from './entity/GetLocationWeatherEntity';
import { HelpEntity } from './entity/HelpEntity';
import { LocationEntity } from './entity/LocationEntity';
export type * from './ConsoleWeatherForecastTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ConsoleWeatherForecastEntityBase } from './ConsoleWeatherForecastEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ConsoleWeatherForecastSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    GetCurrentLocationWeather(entopts?: Record<string, any>): GetCurrentLocationWeatherEntity;
    GetLocationWeather(entopts?: Record<string, any>): GetLocationWeatherEntity;
    Help(entopts?: Record<string, any>): HelpEntity;
    Location(entopts?: Record<string, any>): LocationEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ConsoleWeatherForecastSDK;
    tester(testopts?: any, sdkopts?: any): ConsoleWeatherForecastSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ConsoleWeatherForecastSDK;
export { stdutil, config, BaseFeature, ConsoleWeatherForecastEntityBase, ConsoleWeatherForecastSDK, SDK, };
