import { CodeGeneratorFactory } from "./code-generator-factory";

export const CodeGeneratorFactoryProvider = {
    TICKETS: Symbol("CODE_GENERATOR_LENGTH_4_FACTORY")
} as const

export const TicketsCodeGeneratorProvider = {
    provide: CodeGeneratorFactoryProvider.TICKETS,
    useValue: new CodeGeneratorFactory(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        4,
        22695481,
        1
    ),
}