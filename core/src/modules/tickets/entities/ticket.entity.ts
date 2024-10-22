import { TICKET_HASH_LENGTH } from 'src/constants';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tickets')
export class TicketEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "char", length: TICKET_HASH_LENGTH, nullable: false })
  hash: string

  @Column({ type: "smallint", default: 0 })
  useCount: number;

  @Column({ type: "smallint", nullable: true })
  useMax: number;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'userId' })
  // user: User;
  // @Column()
  // userId: string;

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
