import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class User {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: String 
  
  @Column({unique: true})
  email: String;

  @Column()
  password: String;
}
