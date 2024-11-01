import { ECurrency } from 'src/common/types/currency.enum';
import { EventEntity } from 'src/modules/events/entities/event.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false, type: "bigint" })
  amount: number
  @Column({ nullable: false, type: "enum", enum: ECurrency, default: ECurrency.UAH })
  currency: ECurrency

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;
  @Column()
  eventId: string;

  @Column({ nullable: false, default: false })
  isPaid: boolean;

  @Column({ nullable: true, type: "date" })
  paidAt?: Date;

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
