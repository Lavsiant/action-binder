import { Action } from "./action/action.model";
import { generateGuid } from "./common/id-generator.function";
import { IdentifiedEntityDefinition } from "./definitions/identified-entity.definition";
import { Keys } from "./enums/keyboard.enum";


export class Binding implements IdentifiedEntityDefinition<string> {
    id: string;
    name: string;
    hotkey: Keys[];
    initialAction: Action;
    intermediateActions: Action[];
    outputAction: Action;

    isEnabled: boolean = false;

    constructor() {
    }
            

    update(binding: Binding) {
        this.name = binding.name;
        this.hotkey = binding.hotkey;
        this.initialAction = binding.initialAction;
        this.intermediateActions = binding.intermediateActions;
        this.outputAction = binding.outputAction;
    }
}
