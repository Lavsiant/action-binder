import { Action } from "./action.model";

export abstract class OutputAction<TInput> extends Action {

    constructor(name: string) {
        super(name);
    }

    abstract override  execute(data: TInput) : void;
}