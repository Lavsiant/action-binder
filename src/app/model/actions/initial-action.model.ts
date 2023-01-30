import { Action } from "./action.model";

export abstract class InitialAction<TOutput> extends Action {

    constructor(name: string) {
        super(name);
    }

    abstract override execute() : Promise<TOutput>;
}