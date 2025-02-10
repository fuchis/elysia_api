import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "",
    password: "",
    database: "Elysia",
    synchronize: false,
    logging: true,
    entities: [UserEntity],
    migrations: [],
    subscribers: [],
})
