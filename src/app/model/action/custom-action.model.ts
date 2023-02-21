import { ActionDataType } from "../enums/action-data-type.enum";
import { ActionProcessorType } from "../enums/action-processor-type.enum";
import { ActionType } from "../enums/action-type.enum";
import { Action } from "./action.model";

export class CustomAction<TInput, TOutput> extends Action {
    executionCode: string;

    constructor(
        name: string, 
        type: ActionType,
        executionCode: string,
        inputType?: ActionDataType,
        outputType?: ActionDataType) {
        super(name, type, ActionProcessorType.CustomAction);
        this.executionCode = executionCode;
        this.inputType = inputType?.valueOf();
        this.outputType = outputType?.valueOf();
    }

    execute(data: TInput) {
        const result: TOutput = eval(this.executionCode);
        return result;
    }
}