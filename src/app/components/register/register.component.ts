import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);
  firestore = inject(Firestore);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  errorMessage: string | null = null;

  async onSubmit() {
    const { email, password, name } = this.form.getRawValue();  
    try {
      const userCredential = await this.auth.register(email, password);
      const user = userCredential.user;
      console.log('user', user, userCredential.user);
      await setDoc(doc(this.firestore, 'user', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: name,
        createdAt: new Date(),
      });
      this.router.navigateByUrl('/profile');
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }
}
