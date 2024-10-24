// Read before changing - https://en.wikipedia.org/wiki/Linear_congruential_generator
export class CodeGenerator { 
    public state: number

    private readonly availableChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    public readonly codeLength: number = 4;

    // LCG arguments
    private readonly A = 22695481;
    private readonly C = 1;
    // make sure uniqueMax is less then MAX_SAFE_INTEGER
    public readonly uniqueMax = Math.pow(this.availableChars.length, this.codeLength) // 1679616

    private n: number = 0;
    
    constructor(seed: number) { 
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
        if (this.n > this.uniqueMax)
            throw new Error("Out of unique codes");

        this.state = (this.A * this.state + this.C) % this.uniqueMax;
        this.n++;

        return this.transformToCode(this.state);
    }
};
