import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class User {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: String;

  @Column()
  password: String;

  @Column()
  name: String;
}
