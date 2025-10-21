import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.modelo';
import { collection, Firestore, orderBy, query } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientes: Observable<Cliente[]>;

  constructor(private firestore: Firestore) {
    // realizamos una consulta a Firestore para obtener los clientes
    const clientesRef = collection(this.firestore, 'clientes');
    const consulta = query(clientesRef, orderBy('nombre', 'asc'));
    this.clientes = collectionData(consulta, { idField: 'id' }) as Observable<Cliente[]>;
  }

  getClientes(): Observable<Cliente[]> {
    return this.clientes;
  }
}
