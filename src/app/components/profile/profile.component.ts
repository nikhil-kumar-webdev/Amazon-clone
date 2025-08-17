import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  auth = inject(AuthService);
  user$ = this.auth.user$;

  logout() {
    this.auth.logout();
  }
}
