import { ConsoleWeatherForecastEntityBase } from '../ConsoleWeatherForecastEntityBase';
import type { ConsoleWeatherForecastSDK } from '../ConsoleWeatherForecastSDK';
import type { Control } from '../types';
import type { Location, LocationLoadMatch } from '../ConsoleWeatherForecastTypes';
declare class LocationEntity extends ConsoleWeatherForecastEntityBase<Location> {
    constructor(client: ConsoleWeatherForecastSDK, entopts: any);
    make(this: LocationEntity): LocationEntity;
    load(this: any, reqmatch?: LocationLoadMatch, ctrl?: Control): Promise<LocationEntity>;
}
export { LocationEntity };
