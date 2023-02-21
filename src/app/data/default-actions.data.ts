import { Action } from "../model/action/action.model";
import { CustomAction } from "../model/action/custom-action.model";
import { DisplayTextAction } from "../model/action/default-actions/display-text-action.model";
import { ExtractTextAction } from "../model/action/default-actions/extract-text-action.model";
import { ScreenShotAction as ScreenshotAction } from "../model/action/default-actions/screenshot-action.model";
import { ActionDataType } from "../model/enums/action-data-type.enum";
import { ActionType } from "../model/enums/action-type.enum";

export const defaultActions: Action[] = [
    new DisplayTextAction(),
    new ExtractTextAction(),
    new ScreenshotAction(),
    new CustomAction<string, string>('Process string action', ActionType.Intermediate, '', ActionDataType.String, ActionDataType.String),
    new CustomAction<string, string>('Process string action1', ActionType.Intermediate, '', ActionDataType.String, ActionDataType.Number),
    new CustomAction<string, string>('Process string action2', ActionType.Intermediate, '', ActionDataType.Number, ActionDataType.String),
];


