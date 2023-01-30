import { OutputAction } from "../output-action.model";

export class DisplayTextAction extends OutputAction<string> {

    constructor(name: string) {
        super(name);
    }

    async execute(data: string): Promise<void> {
        alert(data);
    }   
}