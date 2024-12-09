/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['datoId'])
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  datoId: string;

  @Column({ default: 0 }) // 기본값을 0으로 설정
  likes: number;
}
