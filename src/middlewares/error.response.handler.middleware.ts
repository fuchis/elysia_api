import { Elysia } from 'elysia';
import { logger } from './logger.middleware';
// Middleware para formatear errores
export const errorInterceptor = (app: Elysia) =>
    app.onError(({ request, error, code, set }) => {

        //logger.error(error.stack);
        const source = new URL(request.url).pathname;
        const httpStatus = set.status || error.status || 500;

        const response = [
            {
                error: {
                    httpStatus,
                    message: error.message,
                    links: { source }
                }
            }
        ];

        return response;

    });
