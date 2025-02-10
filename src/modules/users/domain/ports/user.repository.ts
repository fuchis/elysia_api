// src/modules/users/domain/ports/UserRepository.ts
import { User } from "../models/user.model";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(user: Omit<User, "id">): Promise<User>;
  update(id: number, user: Partial<Omit<User, "id">>): Promise<User | null>;
  delete(id: number): Promise<boolean>;
}
