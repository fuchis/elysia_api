// src/index.ts

import { Elysia } from "elysia";
import { AppDataSource } from "./modules/users/infraestructure/persistance/typeorm/data-source";
import { UserModule } from "./modules/users";
import { successInterceptor } from "./middlewares/responde.formatter.handler";
import { errorInterceptor } from "./middlewares/error.response.handler.middleware";
import { logger } from "./middlewares/logger.middleware";

AppDataSource.initialize().then(() => {
  console.log("Data Source inicializada correctamente.");
  // Crear la aplicación principal de Elysia y montar el sub-aplicativo
  new Elysia({prefix: '/api/v1'})
  .use(logger.into())
  .use(errorInterceptor)
  .use(successInterceptor)
  .use(UserModule)
  .listen(3000, () => {
    logger.info("Servidor Elysia corriendo en el puerto 3000");
  });
}).catch((error) => {
  logger.error("Error al inicializar la Data Source:", error);
});


