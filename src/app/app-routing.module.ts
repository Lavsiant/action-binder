import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionListComponent } from './components/action/action-list/action-list.component';
import { BindingListComponent } from './components/binding/binding-list/binding.component';

const routes: Routes = [
  { path: 'binding/list', component: BindingListComponent },
  { path: 'action/list', component: ActionListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
