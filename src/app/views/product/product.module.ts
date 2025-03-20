import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {ProductComponent} from "./product.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    RouterModule,
    ProductRoutingModule
  ],
  exports: [
    ProductRoutingModule
  ]
})
export class ProductModule { }
