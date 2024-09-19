import { Entity, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  active: boolean;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  lastname: string;

  @Column()
  roleId: number;

  @DeleteDateColumn()
  deletedAt: Date;
}
