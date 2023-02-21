import { ActionDataType } from "../enums/action-data-type.enum";
import { ActionProcessorType } from "../enums/action-processor-type.enum";
import { ActionType } from "../enums/action-type.enum";


export class Action {
    name: string;
    type: ActionType;
    outputType?: ActionDataType;
    inputType?: ActionDataType;
    processorType: ActionProcessorType;

    constructor(name: string, type: ActionType, processorType: ActionProcessorType) {
        this.name = name;
        this.type = type;
        this.processorType = processorType;
    }
}