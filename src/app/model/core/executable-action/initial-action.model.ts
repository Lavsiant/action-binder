import { ActionType } from "../enums/action-type.enum";
import { Action } from "./action.model";

export abstract class InitialAction<TOutput> extends Action {

    constructor(name: string) {
        super(name, ActionType.Initial);
    }

    abstract override execute() : Promise<TOutput>;

    getOutputType() {}
}