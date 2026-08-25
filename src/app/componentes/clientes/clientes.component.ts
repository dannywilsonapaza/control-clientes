import { Component, ElementRef, ViewChild } from '@angular/core';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  clientes: Cliente[] | null = null;
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined,
  };

  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  constructor(private clienteServicio: ClienteService) {}

  ngOnInit() {
    this.clienteServicio.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal(): number {
    return (
      this.clientes?.reduce(
        (total, cliente) => total + (cliente.saldo ?? 0),
        0,
      ) ?? 0
    );
  }

  /** Iniciales del cliente para el avatar. */
  iniciales(cliente: Cliente): string {
    const n = (cliente.nombre ?? '').trim();
    const a = (cliente.apellido ?? '').trim();
    return `${n.charAt(0)}${a.charAt(0)}`.toUpperCase();
  }

  /** Color de avatar determinista basado en el nombre del cliente. */
  avatarColor(cliente: Cliente): string {
    const colores = [
      '#8f9cff',
      '#4cd6a5',
      '#ffc95e',
      '#ff8f9c',
      '#5fd4e6',
      '#c39bff',
      '#ff9d7a',
    ];
    const semilla = `${cliente.nombre ?? ''}${cliente.apellido ?? ''}`;
    let hash = 0;
    for (let i = 0; i < semilla.length; i++) {
      hash = (hash << 5) - hash + semilla.charCodeAt(i);
      hash |= 0;
    }
    return colores[Math.abs(hash) % colores.length];
  }

  agregar(clienteForm: NgForm) {
    const { value, valid } = clienteForm;
    if (valid) {
      // Agregamos la logica para guardar el cliente
      this.clienteServicio.agregarCliente(value);
      // Limpiamos el formulario
      clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
}
