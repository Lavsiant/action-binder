import { ActionType } from "../enums/action-type.enum";
import { Action } from "./action.model";

export abstract class IntermediateAction<TInput, TOutput> extends Action {

    constructor(name: string) {
        super(name, ActionType.Intermediate);
    }

    abstract override execute(data: TInput): Promise<TOutput>;
}