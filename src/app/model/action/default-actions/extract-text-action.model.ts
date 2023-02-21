import { ImageDefinition } from "../../definitions/image.model";
import { ActionDataType } from "../../enums/action-data-type.enum";
import { ActionProcessorType } from "../../enums/action-processor-type.enum";
import { ActionType } from "../../enums/action-type.enum";
import { Action } from "../action.model";
const ReadText = require('text-from-image')


export class ExtractTextAction extends Action {

    constructor() {
        super('Extract text action', ActionType.Intermediate, ActionProcessorType.ExtractTextAction);
        this.inputType = ActionDataType.Image;
        this.outputType = ActionDataType.String;
    }

    async execute(data: ImageDefinition): Promise<string> {
        const text: string = await ReadText(data.buffer);

        return text;
    }   
}