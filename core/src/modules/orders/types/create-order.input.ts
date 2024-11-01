import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderInput {
    @IsNotEmpty()
    @IsString()
    eventId: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
}