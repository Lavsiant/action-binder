export class DropdownOption<TValue> {
    value: TValue;
    text: string;

    constructor(value: TValue, text: string) {
        this.value = value;
        this.text = text;
    }
}