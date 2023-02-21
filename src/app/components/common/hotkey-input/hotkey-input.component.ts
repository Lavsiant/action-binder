import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, Provider, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { throws } from 'assert';
import { Keys } from 'src/app/model/enums/keyboard.enum';

const HOTKEY_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HotKeyInputComponent),
    multi: true,
};

@Component({
    selector: 'hotkey-input',
    templateUrl: 'hotkey-input.component.html',
    styleUrls: ['hotkey-input.component.scss'],
    providers: [HOTKEY_CONTROL_VALUE_ACCESSOR],
})

export class HotKeyInputComponent implements OnInit, ControlValueAccessor {
    @Input() hotkeyString: string;
    @Output() onHotkeySelect?: EventEmitter<any> = new EventEmitter();

    keys: Keys[] = [];
    isListeningKeyPressEvents: boolean = false;
    isHotkeyInputEnded: boolean = true;
    isDisabled: boolean = false;

    private onTouched!: Function;
    private onChanged!: Function;

    @ViewChild('hotkeyInput') inputRef: ElementRef;

    constructor() { }

    writeValue(obj: Keys[]): void {
        this.keys = obj;
        this.updateHotkeyString();
    }

    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    
    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyPressEvent(event: KeyboardEvent) {
        this.onTouched();
        if (this.isListeningKeyPressEvents) {
            this.isHotkeyInputEnded = false;
        }

    }


    @HostListener('document:keyup', ['$event'])
    handleKeyUpEvent(event: KeyboardEvent) {
        console.log('key up');

        if (this.isListeningKeyPressEvents) {
            this.keys.push((<any>Keys)[event.key]);
            this.keys = this.keys.sort();
            this.updateHotkeyString();
            this.isHotkeyInputEnded = true;
        }

        setTimeout(() => {
            if (this.isHotkeyInputEnded) {
                this.isListeningKeyPressEvents = false;
                this.onHotkeySelect?.emit(this.keys);
                this.inputRef.nativeElement.blur();
                this.onChanged(this.keys);
            }
        }, 200)

    }

    ngOnInit(): void { }

    handleHotkeyInputFocus(): void {
        this.isListeningKeyPressEvents = true;
        this.isHotkeyInputEnded = false;

        this.keys = [];
        this.hotkeyString = '';
    }

    handleHotkeyInputBlur(): void {
        this.isListeningKeyPressEvents = false;
    }

    handleHotkeyInputKeyPress(event: any): void {
        event.preventDefault();
    }

    updateHotkeyString(): void {
        this.hotkeyString = this.keys ? this.keys.join(' + ') : '';
    }
}