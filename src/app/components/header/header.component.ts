import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  firestore = inject(Firestore);
  userData: any;

  constructor(private userService: AuthService) {}
  async ngOnInit(): Promise<void> {
    this.userService.user$.subscribe(async (user) => {
      if (user) {
        // console.log('user', user?.uid);
        const data = await this.userService.getDocumentById('user', user?.uid);
        this.userData = data;
        // console.log('user name', data);
      }
    });
  }
}
