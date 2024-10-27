import { ECurrency } from 'src/common/types/currency.enum';
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

  @Column({ nullable: false, type: "bigint" })
  ticketPrice: number
  @Column({ nullable: false, type: "enum", enum: ECurrency, default: ECurrency.UAH })
  ticketPriceCurr: ECurrency
  
  @Generated('increment')
  @Column({ nullable: false, type: "bigint" })
  codeSeed: number
  
  @Column({ nullable: false, type: "bigint", default: 0 })
  codesGenerated: number

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;
}