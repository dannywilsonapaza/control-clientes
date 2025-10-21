import { Component } from '@angular/core';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes: Cliente[] | null = null;

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  // getSaldoTotal(): number {
  //   let saldoTotal: number = 0;
  //   if (this.clientes) {
  //     this.clientes.forEach(cliente => {
  //       if(cliente.saldo !== undefined){
  //         saldoTotal += cliente.saldo;
  //       }
  //     });
  //   }
  //   return saldoTotal;
  // }
  getSaldoTotal(): number {
    return this.clientes?.reduce((total, cliente) => total + (cliente.saldo ?? 0), 0) ?? 0;
  }
}
