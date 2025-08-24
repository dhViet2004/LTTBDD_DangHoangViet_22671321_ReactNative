class Logger {
    private static instance: Logger;

    private constructor() { }

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(message: string): void {
        console.log(`[Logger] ${message}`);
    }
}
const logger1 = Logger.getInstance();
logger1.log("This is the first log message.");