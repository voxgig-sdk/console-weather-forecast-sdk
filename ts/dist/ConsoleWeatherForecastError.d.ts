import { Context } from './Context';
declare class ConsoleWeatherForecastError extends Error {
    isConsoleWeatherForecastError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ConsoleWeatherForecastError };
