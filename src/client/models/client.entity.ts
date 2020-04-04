import {BaseEntity, Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Client extends BaseEntity {
       
  @PrimaryColumn()
  id: string;
  
  @Column({
    length: 100
  })
  secret: string;
}
