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
  namaFasilitas: string;

  @Column({ unique: true, nullable: true })
  nomorIzin: string;

  @Column({ type: 'date', nullable: true })
  tanggalIzin: Date;

  @Column({ nullable: true })
  fileIzinUrl: string;

  @Column({ nullable: true })
  penerbitIzin: string;

  @Column({ type: 'date', nullable: true })
  berlakuSampai: Date;

  @Column({ nullable: true })
  namaPimpinan: string;

  @Column({ nullable: true })
  nomorTelepon: string;

  @Column({ nullable: true })
  alamatKantor: string;

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
