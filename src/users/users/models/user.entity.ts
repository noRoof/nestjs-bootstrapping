import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
}
