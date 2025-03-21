import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {CutTextPipe} from "./pipes/cut-text.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLinkActive, RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CutTextPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RouterLinkActive
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    CutTextPipe
  ]
})
export class SharedModule { }
