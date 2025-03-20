import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {HttpClient} from "@angular/common/http";
import {OrderType} from "../types/order.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  product: string = '';
  constructor(private http: HttpClient) {
  }

  createOrder(data: OrderType): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>('https://testologia.ru/order-tea', data);
  }
}
