import { ActionDataType } from "../../enums/action-data-type.enum";
import { ActionProcessorType } from "../../enums/action-processor-type.enum";
import { ActionType } from "../../enums/action-type.enum";
import { Action } from "../action.model";

export class DisplayTextAction extends Action {

    constructor() {
        super('Display text action', ActionType.Output, ActionProcessorType.DisplayTextAction);
        this.inputType = ActionDataType.String;
    }

    async execute(data: string): Promise<void> {
        alert(data);
    }   
}