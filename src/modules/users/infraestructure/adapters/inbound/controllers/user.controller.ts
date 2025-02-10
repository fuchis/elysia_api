// src/infrastructure/inbound/elysia/userController.ts
import { Elysia, t } from "elysia";
import { IUserService } from "../../../../application/services/user.service.interface";
import { logger } from "../../../../../../middlewares/logger.middleware";


export const UserController = (userService: IUserService) => {
  return new Elysia()
    .state('typeName', 'user')
    // Endpoint: Obtener todos los usuarios
    .get("/users", async () => {
      logger.info("Entrando a usuarios")
      const users = await userService.getAllUsers();
      return users;
    })
    // Endpoint: Obtener usuario por ID
    .get("/users/:id", async ({ params }) => {
      logger.info("Entrando a usuario")
      return await userService.getUserById(parseInt(params.id));      
    })
    // Endpoint: Crear usuario (validación con TypeBox a través de Elysia)
    .post("/users", async ({ body }) => {
      try {
        const newUser = await userService.createUser(body);
        return new Response(JSON.stringify(newUser), { status: 201 });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Error al crear usuario" }), { status: 500 });
      }
    }, {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      })
    })
    // Endpoint: Actualizar usuario
    .put("/users/:id", async ({ params, body }) => {
      const id = parseInt(params.id);
      const updatedUser = await userService.updateUser(id, body);
      if (updatedUser) return updatedUser;
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
    })
    // Endpoint: Eliminar usuario
    .delete("/users/:id", async ({ params }) => {
      const id = parseInt(params.id);
      const deleted = await userService.deleteUser(id);
      if (deleted) return { message: "Usuario eliminado correctamente" };
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 404 });
    });
};
