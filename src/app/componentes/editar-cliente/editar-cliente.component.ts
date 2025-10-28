import { Component } from '@angular/core';
import { Cliente } from '../../modelo/cliente.modelo';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  imports: [FormsModule, RouterModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent {
  cliente: Cliente ={
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined
  }

  id: string | null = null;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.clienteService.getCliente(this.id).subscribe((cliente: Cliente | null) => {
        if (cliente) {
          this.cliente = cliente;
        } else {
          console.log('Cliente no encontrado');
          this.router.navigate(['/']);
        }
      });
    }
    else{
      console.log('ID de cliente no proporcionado');
      this.router.navigate(['/']);
    }
  }

  guardar(clienteForm: NgForm) {
    const {value, valid} = clienteForm;
    if(valid){
      value.id = this.id;
      this.clienteService.modificarCliente(value);
      this.router.navigate(['/']);
    }

  }

  eliminar(){
    if(confirm('¿Estás seguro de que deseas eliminar este cliente?')){
      this.clienteService.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}

