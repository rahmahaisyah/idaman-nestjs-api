import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Penangkaran } from '../../penangkaran/entities/penangkaran.entity';

export enum JenisTsl {
  TUMBUHAN = 'tumbuhan',
  SATWA_LIAR = 'satwa_liar',
}

export enum StatusCites {
  NON_APENDIKS = 'non_apendiks',
  APENDIKS_I = 'apendiks_i',
  APENDIKS_II = 'apendiks_ii',
  APENDIKS_III = 'apendiks_iii',
}

export enum StatusIucn {
  TIDAK_DIEVALUASI = 'tidak_dievaluasi',
  DATA_TIDAK_CUKUP = 'data_tidak_cukup',
  RISIKO_RENDAH = 'risiko_rendah',
  HAMPIR_TERANCAM = 'hampir_terancam',
  RENTAN = 'rentan',
  TERANCAM_PUNAH = 'terancam_punah',
  SANGAT_TERANCAM_PUNAH = 'sangat_terancam_punah',
  PUNAH_DI_ALAM = 'punah_di_alam',
  PUNAH = 'punah',
}

export enum StatusPerlindunganNasional {
  TIDAK_DILINDUNGI = 'tidak_dilindungi',
  DILINDUNGI = 'dilindungi',
}

@Entity('referensi_tsl')
export class ReferensiTsl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  namaDaerah: string;

  @Column({
    type: 'enum',
    enum: JenisTsl,
  })
  jenis: JenisTsl;

  @Column()
  kingdom: string;

  @Column()
  divisi: string;

  @Column()
  kelas: string;

  @Column()
  ordo: string;

  @Column()
  famili: string;

  @Column()
  genus: string;

  @Column()
  spesies: string;

  @Column({
    type: 'enum',
    enum: StatusPerlindunganNasional,
  })
  statusPerlindunganNasional: StatusPerlindunganNasional;

  @Column({
    type: 'enum',
    enum: StatusCites,
  })
  statusCites: StatusCites;

  @Column({
    type: 'enum',
    enum: StatusIucn,
  })
  statusIucn: StatusIucn;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Penangkaran, (penangkaran) => penangkaran.referensiTsl)
  penangkarans: Penangkaran[];
}
