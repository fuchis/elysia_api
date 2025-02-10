import { logger } from "../../../../middlewares/logger.middleware";
import { User } from "../../domain/models/user.model";
import { IUserRepository } from "../../domain/ports/user.repository";
import { IUserService } from "./user.service.interface";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) { }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
      const user = await this.userRepository.findById(id);
      if (user) return user;
      throw new Error('Usuario No Encontrado');

  }

  async createUser(userData: Omit<User, "id">): Promise<User> {
    return this.userRepository.create(userData);
  }

  async updateUser(id: number, userData: Partial<Omit<User, "id">>): Promise<User | null> {
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
