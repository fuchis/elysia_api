import { UserService } from "./application/services/user.service";
import { IUserService } from "./application/services/user.service.interface";
import { IUserRepository } from "./domain/ports/user.repository";
import { UserController } from "./infraestructure/adapters/inbound/controllers/user.controller";
import { AppDataSource } from "./infraestructure/persistance/typeorm/data-source";
import { UserRepository } from "./infraestructure/persistance/typeorm/user.repository";

const userRepository: IUserRepository = new UserRepository(AppDataSource);
const userService: IUserService = new UserService(userRepository);
export const UserModule = UserController(userService);

