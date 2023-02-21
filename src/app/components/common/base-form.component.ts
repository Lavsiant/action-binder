import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export class BaseFormComponent {
	  form: FormGroup;

    constructor() {
    }

    getAbstractControlAsFormGroup(control: AbstractControl<any,any>) : FormGroup {
      return control as FormGroup;
    }

    getAbstractControlAsFormControl(control: AbstractControl<any,any>) : FormControl {
      return control as FormControl;
    }
}