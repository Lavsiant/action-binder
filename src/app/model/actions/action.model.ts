
export abstract class Action {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract execute(parameter: any | never): any | void;
}