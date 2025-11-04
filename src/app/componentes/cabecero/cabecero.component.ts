import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-cabecero',
  imports: [RouterModule],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css',
})
export class CabeceroComponent {
  isLoggedIn: boolean = false;
  loggedInUser: string | null = null;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.getAuthState().subscribe((usuario) => {
      if (usuario) {
        this.isLoggedIn = true;
        this.loggedInUser = usuario.email;
      } else {
        this.isLoggedIn = false;
        this.loggedInUser = null;
      }
    });
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
