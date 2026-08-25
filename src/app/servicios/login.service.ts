import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private authService: Auth) {
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.authService, email, password);
  }

  /**
   * Observable del usuario autenticado.
   * Se usa onAuthStateChanged directamente en lugar de authState() de
   * AngularFire para evitar el warning de "API called outside injection
   * context".
   */
  getAuthState(): Observable<User | null> {
    return new Observable((subscriber) => {
      const unsubscribe = onAuthStateChanged(
        this.authService,
        (user) => subscriber.next(user),
        (error) => subscriber.error(error)
      );
      return { unsubscribe };
    });
  }

  logout() {
    this.authService.signOut();
  }
}
