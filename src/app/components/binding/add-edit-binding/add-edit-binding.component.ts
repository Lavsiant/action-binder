import { Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultActions } from 'src/app/data/default-actions.data';
import { Action } from 'src/app/model/action/action.model';
import { Binding } from 'src/app/model/binding.model';
import { DropdownOption } from 'src/app/model/common/dropdown-option.model';
import { ActionDataType } from 'src/app/model/enums/action-data-type.enum';
import { ActionType } from 'src/app/model/enums/action-type.enum';
import { BindingService } from 'src/app/services/binding.service';
import { StorageRepository } from 'src/app/services/storage.repository';
import { BaseFormComponent } from '../../common/base-form.component';

@Component({
	selector: 'app-add-edit-binding',
	templateUrl: './add-edit-binding.component.html',
	styleUrls: ['./add-edit-binding.component.scss']
})

export class AddEditBindingComponent extends BaseFormComponent implements OnInit, OnDestroy {

	binding: Binding;
	isUpdating: boolean;

	isInitialActionSelected: boolean = false;

	actionData: Action[] = defaultActions;

	initialActionDropdownData: DropdownOption<Action>[] = [];

	constructor(private fb: FormBuilder,
		private bindingService: BindingService,
		private router: Router,
		private activatedRoute: ActivatedRoute) {
		super();
		if (!this.binding) {
			this.binding = new Binding();
		}
	}

	ngOnInit(): void {
		this.initDropdownData();

		this.form = this.fb.group({
			id: [],
			isEnabled: [],
			name: ['', Validators.required],
			hotkey: [null, Validators.required],
			initialAction: [null, Validators.required],
			intermediateActions: this.fb.array([]),
			outputAction: [null, Validators.required]
		});

		this.form.valueChanges.subscribe(() => setTimeout(() => this.validateBindingActions(), 0));

		this.activatedRoute.queryParams.pipe().subscribe(
			(params: any) => {
				if (params && params.bindingId) {
					this.isUpdating = true;
					this.bindingService.getBindingById(params.bindingId).then((data: Binding) => {
						if (data) {
							// this.form.get('initialAction')?.setValue(data.initialAction);
							this.form.setValue(data);
						}

					})
				}
			}
		);
	}


	initDropdownData(): void {
		this.initialActionDropdownData = this.actionData
			.filter(x => x.type === ActionType.Initial)
			.map(x => new DropdownOption<Action>(x, x.name));
	}

	getIntermediateActionOptions(index: number): DropdownOption<Action>[] {
		let resultActions: Action[] = [];

		if (index === 0 && this.isInitialActionSelected) {
			resultActions = this.actionData
				.filter(x => x.type === ActionType.Intermediate
					&& x.inputType === this.initialActionValue.outputType);
		} else {
			resultActions = this.actionData
				.filter(x => x.type === ActionType.Intermediate
					&& x.inputType === this.getIntermediateActionValueByIndex(index - 1).outputType);
		}

		return resultActions.map(x => new DropdownOption<Action>(x, x.name));
	}

	getOutputActionOptions(): DropdownOption<Action>[] {
		let result: DropdownOption<Action>[] = [];

		if (!this.intermediateActionsForm.length && this.initialActionValue) {
			result = this.actionData
				.filter(x => x.type === ActionType.Output && x.inputType === this.initialActionValue.outputType)
				.map(x => new DropdownOption<Action>(x, x.name));
		} else if (this.intermediateActionsForm.length) {
			const lastIntermediateAction: Action = this.intermediateActionsForm.at(this.intermediateActionsForm.length - 1).value;

			if (lastIntermediateAction && lastIntermediateAction.outputType != null) {
				result = this.actionData
					.filter(x => x.type === ActionType.Output && x.inputType === lastIntermediateAction.outputType)
					.map(x => new DropdownOption<Action>(x, x.name));
			}
		}



		return result;
	}

	trackByOption(index: number, el: DropdownOption<Action>) {
		return index;
	}

	addIntermediateAction(): void {
		(this.form.get('intermediateActions') as FormArray).push(
			this.fb.control(null, Validators.required)
		);

		this.validateBindingActions();
	}

	deleteIntermediateActionAt(index: number): void {
		(this.form.get('intermediateActions') as FormArray).removeAt(index);
	}

	validateBindingActions() {
		let deleteFromIndex = -1;

		for (let index = 0; index < this.intermediateActionsForm.length; index++) {
			const currentAction: Action = this.intermediateActionsForm.at(index).value;

			if (currentAction) {
				if (index === 0 && currentAction.inputType !== null) {
					const initialAction: Action = this.initialActionValue;

					if (currentAction.inputType !== initialAction.outputType) {
						deleteFromIndex = index;

						break;
					}
				} else if (index > 0 && currentAction.inputType !== null) {
					const prevAction: Action = this.intermediateActionsForm.at(index - 1).value;

					if (prevAction.outputType !== null && currentAction.inputType !== prevAction.outputType) {
						deleteFromIndex = index;

						break;
					}

					if (index === this.intermediateActionsForm.length - 1 && currentAction.outputType !== null) {
						const outputAction: Action = this.form.get('outputAction')?.value;

						if (outputAction && currentAction.outputType !== null && currentAction.outputType !== outputAction.inputType) {
							this.form.get('outputAction')?.reset();
						}
					}
				}
			}
		}

		if (deleteFromIndex >= 0) {
			for (let index = this.intermediateActionsForm.length - 1; index >= deleteFromIndex; index--) {
				this.deleteIntermediateActionAt(index);
			}

			this.form.get('outputAction')?.reset();
		}
	}

	onSubmit(): void {
		if (!this.isFormValid) {
			return;
		}

		if (this.isUpdating) {
			this.bindingService.updateBinding(this.form.value as Binding).then(() => {
				this.router.navigate(['binding/list']);
			});

			return;
		} 
		
		this.binding = this.form.value as Binding;

		this.bindingService.saveBinding(this.binding).then(() => this.bindingService.getAllBindings().then(data => {
			this.router.navigate(['binding/list']);
		}))


	}

	onInitialActionChange(): void {
		if (this.initialActionValue) {
			this.isInitialActionSelected = true;
			return;
		}

		this.isInitialActionSelected = false;
	}

	get intermediateActionsForm(): FormArray {
		return this.form.get('intermediateActions') as FormArray;
	}

	get initialActionValue(): Action {
		return this.form.value.initialAction;
	}

	getIntermediateActionValueByIndex(index: number): Action {
		return this.form.value.intermediateActions[index];
	}

	get isFormValid(): boolean {
		return this.form.valid;
	}

	getStringHotkey(binding: Binding): string {
		return binding?.hotkey?.map(x => x.toString()).join(' + ');
	}

	getStringOutputType(action: Action): string {
		return action.outputType !== null && action.outputType != undefined ? ActionDataType[action.outputType] : '';
	}

	getStringInputType(action: Action): string {
		return action.inputType !== null && action.inputType != undefined ? ActionDataType[action.inputType] : '';
	}

	ngOnDestroy() {

	}
}
