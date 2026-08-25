import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardianService implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}

  canActivate(): Observable<boolean> {
    return this.loginService
      .getAuthState()
      .pipe(map((auth) => !!auth || (this.router.navigate(['/login']), false)));
  }
}
