import { Action } from "./actions/action.model";
import { Keys } from "./enums/keyboard.enum";


export class Binding {
    name: string;
    keys: Keys[];
    actions: Action[];

    constructor(name: string, keys: Keys[]) {
        this.name = name;
        this.keys = keys;
        this.actions = [];
    }

    get stringHotkey() : string{
        return this.keys.map(x => x.toString()).join(' + ');
    } 
}