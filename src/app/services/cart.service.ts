import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cart$ = this.cartItems.asObservable();

  addToCart(product: any) {
    const current = this.cartItems.value;
    this.cartItems.next([...current, product]);
    console.log(product);
  }

  removeFromCart(index: number) {
    const current = [...this.cartItems.value];
    current.splice(index, 1);
    this.cartItems.next(current);
  }

  clearCart() {
    this.cartItems.next([]);
  }
  getTotal(): number {
    return this.cartItems.value.reduce((acc, item) => acc + item.price, 0);
  }
}
