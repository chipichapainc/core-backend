import { Injectable } from "@nestjs/common";

export class CodeGenerator { 
    public state: number

    public readonly uniqueMax = Math.pow(this.availableChars.length, this.codeLength) // 1679616

    constructor(
        seed: number,
        private readonly availableChars: string,
        private readonly codeLength: number,
        private readonly A: number,
        private readonly C: number,
        public uses: number
    ) {
        this.state = seed; 
    }

    transformToCode(num: number): string {
        let code = '';
        for (let i = 0; i < this.codeLength; i++) {
            const index = num % this.availableChars.length;
            code = this.availableChars[index] + code;
            num = Math.floor(num / this.availableChars.length);
        }
        return code.padStart(this.codeLength, 'A');
    }

    // Will be promisified in future
    async generate() {
        if (this.uses > this.uniqueMax)
            throw new Error("Out of unique codes");

        this.state = (this.A * this.state + this.C) % this.uniqueMax;
        this.uses++;

        return this.transformToCode(this.state);
    }
};

@Injectable()
export class CodeGeneratorFactory {
    constructor(
        public readonly availableChars: string,
        public readonly codeLength: number,
        private readonly A: number,
        private readonly C = 1
    ) {}

    make(seed: number, uses: number = 0) {
        return new CodeGenerator(
            seed,
            this.availableChars,
            this.codeLength,
            this.A,
            this.C,
            uses
        )
    }
};
