import { ConsoleWeatherForecastEntityBase } from '../ConsoleWeatherForecastEntityBase';
import type { ConsoleWeatherForecastSDK } from '../ConsoleWeatherForecastSDK';
import type { Control } from '../types';
import type { GetCurrentLocationWeather, GetCurrentLocationWeatherLoadMatch } from '../ConsoleWeatherForecastTypes';
declare class GetCurrentLocationWeatherEntity extends ConsoleWeatherForecastEntityBase<GetCurrentLocationWeather> {
    constructor(client: ConsoleWeatherForecastSDK, entopts: any);
    make(this: GetCurrentLocationWeatherEntity): GetCurrentLocationWeatherEntity;
    load(this: any, reqmatch?: GetCurrentLocationWeatherLoadMatch, ctrl?: Control): Promise<GetCurrentLocationWeatherEntity>;
}
export { GetCurrentLocationWeatherEntity };
