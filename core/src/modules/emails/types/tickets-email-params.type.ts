import { TicketEntity } from "src/modules/tickets/entities/ticket.entity";

export type TTicketEmailParams = Array<{ ticket: TicketEntity, qr: string }>