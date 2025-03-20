import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./main.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    RouterModule,
    MainRoutingModule
  ],
  exports: [
    MainRoutingModule
  ]
})
export class MainModule { }
