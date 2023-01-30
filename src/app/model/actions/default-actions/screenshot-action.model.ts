import { ImageDefinition } from "../../definitions/image.model";
import { InitialAction } from "../initial-action.model";
const { desktopCapturer } = require('electron')

export class ScreenShotAction extends InitialAction<ImageDefinition> {

    constructor(name: string) {
        super(name);
    }

    async execute(): Promise<ImageDefinition> {
        const screenShotSources : Electron.DesktopCapturerSource[]  = await desktopCapturer.getSources({ types: ['screen'] });
        const buffer: Buffer = screenShotSources[0].thumbnail.toBitmap();

        return { buffer: buffer };
    }   
}