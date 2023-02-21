import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Binding } from "src/app/model/binding.model";
import { BindingService } from "src/app/services/binding.service";

@Component({
    selector: 'binding-list',
    templateUrl: './binding.component.html',
    styleUrls: ['_binding.component.scss']
})

export class BindingListComponent implements OnInit {
    bindings: Binding[] = [];

    constructor(private router: Router,
        private bindingService: BindingService) {

    }

    ngOnInit(): void {
        this.bindingService.getAllBindings().then(data => {
            if (data) {
                this.bindings = data;
            }
        })
    }

    editBinding(binding: Binding): void {
        this.router.navigate(['binding/add-edit'], { queryParams: { bindingId: binding.id } });
    }

    deleteBinding(binding: Binding): void {
        this.bindingService.deleteBinding(binding.id).then(() => {
            this.bindings = this.bindings.filter(x => x.id !== binding.id);
        })
    }

    addBinding(): void {
        this.router.navigate(['binding/add-edit']);
    }
}