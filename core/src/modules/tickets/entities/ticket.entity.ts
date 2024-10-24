import { TICKET_HASH_LENGTH } from 'src/configs/constants';
import { TicketsCodeGeneratorProvider } from 'src/modules/code-generator/code-generator.provider';
import { CryptoService } from 'src/modules/crypto/crypto.service';
import { EventEntity } from 'src/modules/events/entities/event.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tickets')
export class TicketEntity {
  @PrimaryColumn()
  id: string;

  @Column({ 
    type: "varchar",
    nullable: false 
  })
  hash: string

  @Column({ type: "smallint", default: 0 })
  useCount: number;

  @Column({ type: "smallint", nullable: true })
  useMax: number;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;
  @Column()
  eventId: string;

  @Column({ nullable: false, default: false })
  isPaid: boolean;

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
