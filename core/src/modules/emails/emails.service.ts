import { TicketEntity } from "../tickets/entities/ticket.entity";

export abstract class EmailsService {
    abstract sendTicketEmail(to: string, ticket: TicketEntity): Promise<void>
}