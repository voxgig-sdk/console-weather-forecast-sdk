import { ConsoleWeatherForecastEntityBase } from '../ConsoleWeatherForecastEntityBase';
import type { ConsoleWeatherForecastSDK } from '../ConsoleWeatherForecastSDK';
import type { Control } from '../types';
import type { Help, HelpLoadMatch } from '../ConsoleWeatherForecastTypes';
declare class HelpEntity extends ConsoleWeatherForecastEntityBase<Help> {
    constructor(client: ConsoleWeatherForecastSDK, entopts: any);
    make(this: HelpEntity): HelpEntity;
    load(this: any, reqmatch?: HelpLoadMatch, ctrl?: Control): Promise<HelpEntity>;
}
export { HelpEntity };
