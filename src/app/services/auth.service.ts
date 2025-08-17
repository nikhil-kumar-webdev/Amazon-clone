import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  user$ = new BehaviorSubject<User | null>(null);
  private userSubject = new BehaviorSubject<User | null>(null);
  private firestore = inject(Firestore);

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      this.user$.next(user);
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => this.router.navigateByUrl('/login'));
  }

  isLoggedIn() {
    return this.auth.currentUser !== null;
  }

  async getCollectionData(collectionName: string): Promise<any[]> {
    const colRef = collection(this.firestore, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  getcurrentUser(): User | null {
    return this.userSubject.value;
  }

  async getDocumentById(
    collectionName: string,
    docId: string
  ): Promise<any | null> {
    const docRef = doc(this.firestore, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return {};
    }
  }

  
}
