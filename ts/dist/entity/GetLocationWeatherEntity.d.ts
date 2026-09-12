import { ConsoleWeatherForecastEntityBase } from '../ConsoleWeatherForecastEntityBase';
import type { ConsoleWeatherForecastSDK } from '../ConsoleWeatherForecastSDK';
import type { Control } from '../types';
import type { GetLocationWeather, GetLocationWeatherLoadMatch } from '../ConsoleWeatherForecastTypes';
declare class GetLocationWeatherEntity extends ConsoleWeatherForecastEntityBase<GetLocationWeather> {
    constructor(client: ConsoleWeatherForecastSDK, entopts: any);
    make(this: GetLocationWeatherEntity): GetLocationWeatherEntity;
    load(this: any, reqmatch?: GetLocationWeatherLoadMatch, ctrl?: Control): Promise<GetLocationWeatherEntity>;
}
export { GetLocationWeatherEntity };
