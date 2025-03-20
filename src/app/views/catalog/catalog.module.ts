import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import {CatalogComponent} from "./catalog.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    CatalogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    SharedModule,
    CatalogRoutingModule
  ],
  exports: [
    CatalogRoutingModule
  ]
})
export class CatalogModule { }
