import { CodeGenerator } from "./code-generator.service";

describe('CodeGenerator', () => {
    describe('code generation', () => {
        it('.generate() should return a string', async () => {
            const service = new CodeGenerator(1);
            const code = await service.generate();
            expect(typeof code).toEqual('string');
        });
        it('generated code should be specified length', async () => {
            let service = new CodeGenerator(1);
            let code = await service.generate();
            expect(code.length).toEqual(service.codeLength)
        });
        it('generated code should be unique', async () => {
            const service = new CodeGenerator(74564444);
            const codes = new Set<string>()
            for (let i = 0; i < service.uniqueMax; i++) {
                const code = await service.generate()
                expect(codes.has(code)).toEqual(false)
                codes.add(code)
            }
            expect(codes.size).toEqual(service.uniqueMax)
        });
        it('generator should throw error if out of unique codes', async () => {
            const service = new CodeGenerator(1);
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