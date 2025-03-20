import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy {
  showPopup = false;
  private observable: Observable<boolean>;
  private popupSubscription?: Subscription;

  constructor(private router: Router) {
    this.observable = new Observable((observer) => {
      const timeout = setTimeout(() => {
        observer.next(true)
      }, 10000);

      return () => clearTimeout(timeout)
    })
  }

  ngOnInit() {
    this.popupSubscription = this.observable.subscribe((params) => {
      this.showPopup = params;
    })
  }

  closePopup() {
    this.showPopup = false;
  }

  goToCatalog() {
    this.showPopup = false;
    this.router.navigate(['/catalog'])
  }

  ngOnDestroy() {
    // Очищаем подписку, если компонент уничтожен раньше, чем попап показался
    this.popupSubscription?.unsubscribe()
  }
}
