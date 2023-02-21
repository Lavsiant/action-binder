import { ActionType } from "../../enums/action-type.enum";

export abstract class Action {
    name: string;
    type: ActionType;

    constructor(name: string, type: ActionType) {
        this.name = name;
        this.type = type;
    }

    abstract execute(parameter: any | never): any | void;
}