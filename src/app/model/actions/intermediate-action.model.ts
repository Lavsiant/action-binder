import { Action } from "./action.model";

export abstract class IntermediateAction<TInput, TOutput> extends Action {

    constructor(name: string) {
        super(name);
    }

    abstract override execute(data: TInput) : Promise<TOutput>;
}