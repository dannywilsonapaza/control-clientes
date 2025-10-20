import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CabeceroComponent, PiePaginaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titulo = 'Control de Clientes';
}
