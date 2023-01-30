import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BindingListComponent } from './components/binding/binding-list/binding.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import {MatListModule} from '@angular/material/list'
import { ActionListComponent } from './components/action/action-list/action-list.component';
import { AddEditActionComponent } from './components/action/add-edit-action/add-edit-action.component';


@NgModule({
  declarations: [
    AppComponent,
    BindingListComponent,
    ActionListComponent,
    SidebarComponent,
    AddEditActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatListModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

