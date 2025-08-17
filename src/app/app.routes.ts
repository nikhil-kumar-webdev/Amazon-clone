import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
// import { LoginComponent } from './components/login/login.component';
// import { ProfileComponent } from './components/profile/profile.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
// import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    ],
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  // { path: '', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'cart', component: CartComponent },
  // { path: 'product/:id', component: ProductDetailComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'search', component: SearchComponent },
];
