import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideFirestore,
  getFirestore,
  Firestore,
} from '@angular/fire/firestore';

import { routes } from './app.routes';
import { provideAuth } from '@angular/fire/auth';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: 'AIzaSyCtjfMty4pckNBDZGGksQt4zEncaqvgBvI',
  authDomain: 'angular-firebase-a.firebaseapp.com',
  projectId: 'angular-firebase-a',
  storageBucket: 'angular-firebase-a.firebasestorage.app',
  messagingSenderId: '78680966549',
  appId: '1:78680966549:web:878fc17dc23e17ad5ae29c',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    // provideToastr(),

    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
