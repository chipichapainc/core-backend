import { TicketEntity } from "../entities/ticket.entity"

export interface ICreateTicketParams {
    eventId: string
    useLimit?: number
    count: number
    isPaid?: boolean
}

export type TCreateTicketProperties = Pick<
    TicketEntity, "id" | "eventId" | "hash" | "useMax" | "isPaid"
>