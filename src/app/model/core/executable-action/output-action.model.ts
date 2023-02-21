import { ActionType } from "../enums/action-type.enum";
import { Action } from "./action.model";

export abstract class OutputAction<TInput> extends Action {

    constructor(name: string) {
        super(name, ActionType.Output);
    }

    abstract override  execute(data: TInput) : void;
}