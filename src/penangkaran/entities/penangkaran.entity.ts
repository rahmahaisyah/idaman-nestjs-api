import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ReferensiTsl } from '../../referensi-tsl/entities/referensi-tsl.entity';

@Entity('penangkaran')
export class Penangkaran {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  facilityName: string;

  @Column({ unique: true, nullable: true })
  permitNumber: string;

  @Column({ type: 'date', nullable: true })
  permitDate: Date;

  @Column({ nullable: true })
  permitFileUrl: string;

  @Column({ nullable: true })
  issuer: string;

  @Column({ type: 'date', nullable: true })
  validUntil: Date;

  @Column({ nullable: true })
  directorName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  officeAddress: string;

  @Column()
  facilityAddress: string;

  @ManyToOne(() => ReferensiTsl, (referensi) => referensi.penangkarans)
  @JoinColumn({ name: 'referensiTslId' })
  referensiTsl: ReferensiTsl;

  @Column()
  referensiTslId: string;

  @ManyToOne(() => User, (user) => user.penangkarans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
