import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  errorMessage: string | null = null;

  onSubmit() {
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password)
      .then(() => this.router.navigateByUrl('/cart'))
      .catch(err => this.errorMessage = err.message);
  }
}
