import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  userUuid: number;

  @Column()
  email: string;

  @Column()
  active: boolean;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  roleId: number;
}
