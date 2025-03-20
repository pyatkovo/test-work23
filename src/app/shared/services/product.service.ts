import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductType} from "../types/product.type";
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductType[] = [];
  search$: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {
  }



  getProducts(queryParams: string): Observable<ProductType[] | Record<string, ProductType>> {
    return this.http.get<ProductType[]| Record<string, ProductType>>('https://testologia.ru/tea' + (queryParams ? ('?search=' + queryParams) : ''))
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`)
  }

  setSearchQuery(query: string) { // функция для обновления состояния поиска
    // дополнительно переделываем отправляемое слово для поиска, потому что требуются первые буквы заглавные
    const capitalize = (str: string) => {
      return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    const formattedQuery = capitalize(query.trim());
    this.search$.next(formattedQuery);
  }
}
