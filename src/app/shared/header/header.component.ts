import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
searchString = new FormControl<string>('', {nonNullable: true});


constructor(private router: Router, private productService: ProductService) {}

  search() {
    const query = this.searchString.value;
    if (query) {
      this.productService.setSearchQuery(query); // Обновляем Subject
      this.router.navigate(['/catalog'], { queryParams: { search: query } });
    }
  }

  resetSearch() {
    this.searchString.setValue('');
    this.productService.setSearchQuery(''); // Очищаем Subject
    this.router.navigate(['/catalog'], { queryParams: {} });
  }
}
