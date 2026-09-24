"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleWeatherForecastError = void 0;
class ConsoleWeatherForecastError extends Error {
    isConsoleWeatherForecastError = true;
    sdk = 'ConsoleWeatherForecast';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ConsoleWeatherForecastError = ConsoleWeatherForecastError;
//# sourceMappingURL=ConsoleWeatherForecastError.js.map