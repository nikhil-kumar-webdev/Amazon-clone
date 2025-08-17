import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { doc, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  cartService = inject(CartService);
  data: any[] = [];
  firestore = inject(Firestore);
  userData: any;
  constructor(
    private toastr: ToastrService,
    private api: DataService,
    private router: Router,
    private userService: AuthService
  ) {}

  ngOnInit(): void {
    this.getProducts();

    this.userService.user$.subscribe((user) => {
      if (user) {
        this.userData = user;
        console.log(user);
      } else {
      }
    });
  }

  handleNavigate(productId: number) {
    this.router.navigate(['/product', productId]);
  }
  getProducts() {
    this.api.getData().subscribe((res) => {
      this.data = res?.products;
      console.log(this.data);
    });
  }

  async addToCart(product: any) {
    this.toastr.success('Item Added To Cart Successfully');
    if (!this.userData || !this.userData.uid) {
      alert('Please log in to add items to your cart.');
      return;
    }

    await setDoc(
      doc(
        this.firestore,
        'cart',
        this.userData.uid,
        'items',
        product.id.toString()
      ),
      { product }
    );

    this.cartService.addToCart(product);
  }
  add() {
    this.toastr.success('Everything is working!', 'Success', {
      timeOut: 3000,
    });
  }
}
