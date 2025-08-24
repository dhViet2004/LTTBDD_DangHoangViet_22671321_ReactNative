"use strict";
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(message) {
        console.log(`[Logger] ${message}`);
    }
}
const logger1 = Logger.getInstance();
logger1.log("This is the first log message.");
