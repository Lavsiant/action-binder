import { ImageDefinition } from "../../definitions/image.model";
// import { desktopCapturer } from 'electron';
import { Action } from "../action.model";
import { ActionType } from "../../enums/action-type.enum";
import { ActionDataType } from "../../enums/action-data-type.enum";
import { ActionProcessorType } from "../../enums/action-processor-type.enum";
const desktopCapturer: any= null;
export class ScreenShotAction extends Action {

    constructor() {
        super('Screenshot action', ActionType.Initial, ActionProcessorType.ScreenShotAction);
        this.outputType = ActionDataType.Image;
    }

    async execute(): Promise<ImageDefinition> {
        const screenShotSources : any[]  = await desktopCapturer.getSources({ types: ['screen'] });
        const buffer: Buffer = screenShotSources[0].thumbnail.toBitmap();

        return { buffer: buffer };
    }   
}