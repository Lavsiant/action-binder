import { ImageDefinition } from "../../definitions/image.model";
import { IntermediateAction } from "../intermediate-action.model";
const ReadText = require('text-from-image')


export class ExtractTextAction extends IntermediateAction<ImageDefinition, string> {

    constructor(name: string) {
        super(name);
    }

    async execute(data: ImageDefinition): Promise<string> {
        const text: string = await ReadText(data.buffer);

        return text;
    }   
}