// src/modules/users/infrastructure/persistence/typeorm/UserRepositoryImpl.ts
import { Repository, DataSource } from "typeorm";
import { IUserRepository } from "../../../domain/ports/user.repository";
import { UserEntity } from "./entities/user.entity";
import { User } from "../../../domain/models/user.model";

export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserEntity);
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repository.find();
    return entities.map(e => ({ id: e.id, name: e.name, email: e.email }));
  }

  async findById(id: number): Promise<User | null> {
    const e = await this.repository.findOneBy({ id });
    return e ? { id: e.id, name: e.name, email: e.email } : null;
  }

  async create(userData: Omit<User, "id">): Promise<User> {
    const entity = this.repository.create(userData);
    const saved = await this.repository.save(entity);
    return { id: saved.id, name: saved.name, email: saved.email };
  }

  async update(id: number, userData: Partial<Omit<User, "id">>): Promise<User | null> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) return null;
    Object.assign(entity, userData);
    const updated = await this.repository.save(entity);
    return { id: updated.id, name: updated.name, email: updated.email };
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id });
    return result.affected !== undefined && result.affected > 0;
  }
}
