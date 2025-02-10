import { createPinoLogger } from "@bogeychan/elysia-logger";

export const logger = createPinoLogger({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
            colorized: true
        }
    },
    serializers: {
        req: (req) => ({
          id: req.id,
          method: req.method,
          url: req.url
        }),
    }
});

