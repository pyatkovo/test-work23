import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../shared/types/product.type";
import {ProductService} from "../../shared/services/product.service";
import {OrderService} from "../../shared/services/order.service";


@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: ProductType;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router, private orderService: OrderService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProduct(+params['id']).subscribe((product) => {
          if (product) {
            this.product = product;
          } else {
            this.router.navigate(['/']); // Перенаправляем, если товар не найден
          }
        });
      }
    });
  }

  addToForm(title: string) {
    this.orderService.product = title;
    this.router.navigate(['/order'])
  }

}
