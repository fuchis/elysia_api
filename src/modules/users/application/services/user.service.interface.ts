import { User } from "../../domain/models/user.model";

export interface IUserService {
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  createUser(userData: Omit<User, "id">): Promise<User>;
  updateUser(id: number, userData: Partial<Omit<User, "id">>): Promise<User | null>;
  deleteUser(id: number): Promise<boolean>;
}
