import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "../models/user.model";
import { env } from "./env-schema";

const options: DataSourceOptions = {
  type: "postgres",
  host: env.DATABASE_HOST,
  port: 5432,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASS,
  database: env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
};

export const AppDataSource = new DataSource(options);

export const connectDatabase = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Successfull connect to the database!");
    })
    .catch((error) => {
      console.error(
        "Failed connect to the database!",
        error.message,
        error.trace
      );
      process.exit(1);
    });
};
