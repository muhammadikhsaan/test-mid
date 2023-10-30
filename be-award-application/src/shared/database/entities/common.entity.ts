import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class MetaEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8',
  })
  readonly id?: number;

  @Column({
    name: 'slug',
    type: 'varchar',
  })
  slug: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at?: Date;
}

export abstract class MetaDeleteEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8',
  })
  readonly id?: number;

  @Column({
    name: 'slug',
    type: 'varchar',
    unique: true,
  })
  slug: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deleted_at?: Date;
}
