import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Penangkaran } from '../../penangkaran/entities/penangkaran.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string; // Stored hashed

  @Column()
  name: string;

  @OneToMany(() => Penangkaran, (penangkaran) => penangkaran.user)
  penangkarans: Penangkaran[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
