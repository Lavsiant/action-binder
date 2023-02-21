import { IntermediateAction } from "./intermediate-action.model";

export class CustomAction<TInput, TOutput> extends IntermediateAction<TInput, TOutput> {
    evaluationCode: string;
    
    constructor(name: string) {
        super(name);
    }

    execute(data: TInput): Promise<TOutput> {
        try {
            const result : TOutput = eval(this.evaluationCode);
            return Promise.resolve(result);
        } catch(e: any) {
            console.log(e.message);
            throw new Error('Custom code evaluation was failed.');
        }
    }

}