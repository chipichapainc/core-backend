import { OrderEntity } from "../entities/order.entity"

export interface ICreateOrderParams {
    eventId: string
}

export type TCreateOrderProperties = Pick<
    OrderEntity, "eventId" | "amount" | "currency"
>