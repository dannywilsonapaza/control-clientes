import { Component } from '@angular/core';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes: Cliente[] | null = null;
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined
  }

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }


  getSaldoTotal(): number {
    return this.clientes?.reduce((total, cliente) => total + (cliente.saldo ?? 0), 0) ?? 0;
  }

  agregar(clienteForm: NgForm): void {
    const {value, valid} = clienteForm;
    if(valid){
      //Agregamos la logica para agregar el cliente
      
      //Limpiamos el formulario
      clienteForm.resetForm();
    }
  }
}
