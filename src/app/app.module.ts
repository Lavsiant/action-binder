import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BindingListComponent } from './components/binding/binding-list/binding.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list'
import { ActionListComponent } from './components/action/action-list/action-list.component';
import { AddEditActionComponent } from './components/action/add-edit-action/add-edit-action.component';
import { MatButtonModule } from '@angular/material/button';
import { AddEditBindingComponent } from './components/binding/add-edit-binding/add-edit-binding.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HotKeyInputComponent } from './components/common/hotkey-input/hotkey-input.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    BindingListComponent,
    ActionListComponent,
    SidebarComponent,
    AddEditActionComponent,
    AddEditBindingComponent,
    HotKeyInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

