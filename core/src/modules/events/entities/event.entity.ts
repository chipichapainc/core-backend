import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export const EVENTS_PREFIX_INDEX = 'EVENTS_PREFIX_INDEX'

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string
  
  @Index(EVENTS_PREFIX_INDEX, { unique: true })
  @Column({ nullable: false, unique: true })
  prefix: string
  
  @Generated('increment')
  @Column({ nullable: false, type: "bigint" })
  codeSeed: number

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;
}