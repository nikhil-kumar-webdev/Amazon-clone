import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<any[]>;
  data: any;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.cartItems$ = this.cartService.cart$;
    this.data = await this.authService.getCollectionData('cart');

    console.log('data', this.data);
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
