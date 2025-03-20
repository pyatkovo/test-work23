import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductType} from "../../shared/types/product.type";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy{

  private subscriptionProducts: Subscription | null = null;
  private subscriptionSearch: Subscription | null = null;
  searchString: string = '';
  title: string = '';
  products: ProductType[] = [];



  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.productService.getProducts().subscribe({
    //   next: (data) => {
    //     this.products = data;
    //     console.log(data)
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     this.router.navigate(['/'])
    //   }
    // })

    // this.subscriptionQueryParams = this.activatedRoute.queryParams.subscribe((queryParams) => {
    //   this.searchString = queryParams['search'] ? queryParams['search'] : '';
    //   this.title = this.searchString ? `Результаты поиска по запросу "${this.searchString}"` : "Наши чайные коллекции";
    //   this.subscriptionProducts = this.productService.getProducts(this.searchString)
    //     .subscribe({
    //       next: (products) => {
    //         if(Array.isArray(products)){
    //           this.products = products;
    //           if(products.length === 0){
    //             this.title = 'Ничего не найдено';
    //           }
    //         } else {
    //           this.products = Object.values(products);
    //         }
    //       },
    //       error: (error) => {
    //         console.log(error.message);
    //       }
    //     });
    // });

    this.subscriptionSearch = this.productService.search$.subscribe(query => {
      this.searchString = query;
      this.updateProducts();
    });

    // Подписка на queryParams, чтобы обновлять search$
    this.activatedRoute.queryParams.subscribe(queryParams => {
      const query = queryParams['search'] || '';
      this.productService.setSearchQuery(query); // Синхронизируем Subject
    });
  }

  updateProducts() {
    this.title = this.searchString ? `Результаты поиска по запросу "${this.searchString}"` : "Наши чайные коллекции";
    this.subscriptionProducts = this.productService.getProducts(this.searchString)
      .subscribe({
        next: (products) => {
          if (Array.isArray(products)) {
            this.products = products;
            if (products.length === 0) {
              this.title = 'Ничего не найдено';
            }
          } else {
            this.products = Object.values(products);
          }
        },
        error: (error) => {
          console.log(error.message);
        }
      });
  }


  ngOnDestroy(): void {
    this.subscriptionProducts?.unsubscribe();
    this.subscriptionSearch?.unsubscribe();
  }
}
