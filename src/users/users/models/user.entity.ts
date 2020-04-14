import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { UserRole } from "./user-role";

@Entity()
export class User extends BaseEntity {
       
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    length: 100
  })
  firstName: string;
  
  @Column({
    length: 100
  })
  lastName: string;

  @Column({
    length: 100,
    unique: true
  })
  email: string;

  @Column({
    length: 100
  })
  password: string;
  
  @Column()
  isActive: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.GHOST
  })
  role: UserRole
}
