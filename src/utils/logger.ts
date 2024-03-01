import logger from 'pino';
import dayjs from "dayjs";
import dotenv from "dotenv";

dotenv.config();
const log = logger({
    transport: {
        target: 'pino-pretty'
    },
    level: process.env.LOG_LEVEL || 'info',
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format('HH:mm:ss')}"`
});

export default log;