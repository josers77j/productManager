import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  email: string;
}
