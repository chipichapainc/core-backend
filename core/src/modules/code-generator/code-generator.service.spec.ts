import { TicketsCodeGeneratorProvider } from "./code-generator.provider";

describe('CodeGeneratorService', () => {
    const codeGeneratorFactory = TicketsCodeGeneratorProvider.useValue
    
    describe('code generation', () => {
        it('.generate() should return a string', async () => {
            const service = codeGeneratorFactory.make(1, 0);
            const code = await service.generate();
            expect(typeof code).toEqual('string');
        });
        it('generated code should be specified length', async () => {
            let service = codeGeneratorFactory.make(1, 0);
            let code = await service.generate();
            expect(code.length).toEqual(codeGeneratorFactory.codeLength)
        });
        it('generated code should be unique', async () => {
            const service = codeGeneratorFactory.make(1, 0);
            const codes = new Set<string>()
            for (let i = 0; i < service.uniqueMax; i++) {
                const code = await service.generate()
                expect(codes.has(code)).toEqual(false)
                codes.add(code)
            }
            expect(codes.size).toEqual(service.uniqueMax)
        });
        it('generator should throw error if out of unique codes', async () => {
            const service = codeGeneratorFactory.make(1, 0);
            for (let i = 0; i < service.uniqueMax - 1; i++)
                await service.generate();
            try {
                await service.generate();
            } catch (e) {
                expect(e).toBeDefined();
            }
        });
    });
});