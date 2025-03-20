import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrderService} from "../../shared/services/order.service";
import {OrderType} from "../../shared/types/order.type";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-Яa-zA-Z]+$/)]),
    secondName: new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-Яa-zA-Z]+$/)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{12}$/)]),
    country: new FormControl('', [Validators.required, Validators.pattern(/^[а-яА-Яa-zA-Z]+$/)]),
    index: new FormControl('', [Validators.required, Validators.pattern(/\d/)]),
    address: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я\d\s\-\/]+$/)]),
    product: new FormControl({value: '', disabled: true}, [Validators.required]),
    comment: new FormControl(''),
  })

  get firstName() {
    return this.orderForm.get('firstName');
  }

  get secondName() {
    return this.orderForm.get('secondName');
  }

  get phoneNumber() {
    return this.orderForm.get('phoneNumber');
  }

  get country() {
    return this.orderForm.get('country');
  }

  get index() {
    return this.orderForm.get('index');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get product() {
    return this.orderForm.get('product');
  }

  get comment() {
    return this.orderForm.get('comment');
  }


  constructor(private orderService: OrderService, private router: Router) {
    if (this.orderService.product) {
      this.orderForm.patchValue({
        product: this.orderService.product
      });
    } else {
      this.router.navigate(['/catalog'])
    }
  }


  isOrderSuccessful = false; // Скрывает форму при успешном заказе
  errorMessage = ''; // Сообщение об ошибке
  isSend = false; // Деактивация кнопки

  ngOnInit(): void {

  }

  sendOrder() {
    if (this.orderForm.invalid) {
      this.errorMessage = 'Заполните форму правильно';
      return;
    }
    this.isSend = true;// Деактивируем кнопку
    // Преобразуем данные в нужный формат
    const orderData: OrderType = {
      name: this.orderForm.value.firstName || '',
      last_name: this.orderForm.value.secondName || '',
      phone: this.orderForm.value.phoneNumber || '',
      country: this.orderForm.value.country || '',
      zip: this.orderForm.value.index || '',
      product: this.orderForm.getRawValue().product || '',
      address: this.orderForm.value.address || '',
      comment: this.orderForm.value.comment || null // Пустое значение заменяем на null
    };

    this.errorMessage = ''; // Очищаем ошибку перед запросом
    console.log(orderData);
    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        this.isSend = false;
        if (response.success) {
          this.isOrderSuccessful = true; // Показываем сообщение об успехе
        } else {
          this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      },
      error: () => {
        this.isSend = false;
        this.errorMessage = 'Произошла ошибка. Попробуйте еще раз.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

}
