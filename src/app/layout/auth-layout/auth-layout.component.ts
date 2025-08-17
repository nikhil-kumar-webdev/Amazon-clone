import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthHeaderComponent } from '../auth-header/auth-header.component';
import { AuthFooterComponent } from '../auth-footer/auth-footer.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthHeaderComponent,AuthFooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
