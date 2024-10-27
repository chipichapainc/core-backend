import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderInput {
    @IsNotEmpty()
    @IsString()
    eventId: string
}