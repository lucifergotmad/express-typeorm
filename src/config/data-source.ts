import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../models/user.model";
import { env } from "./env.const";

const options: DataSourceOptions = {
  type: "postgres",
  host: env.DATABASE_HOST,
  port: 5432,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASS,
  database: env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User],
};

export const AppDataSource = new DataSource(options);
