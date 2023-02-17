import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AppDataSource } from "../config/data-source";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 16, unique: true })
  user_id: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "enum", enum: ["ADMIN", "USER"] })
  level: string;
}

export const UserRepository = AppDataSource.getRepository(User);
