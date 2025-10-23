import { Injectable } from '@angular/core';
import { Cliente } from '../modelo/cliente.modelo';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { CollectionReference,addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientesRef: CollectionReference;
  clientes: Observable<Cliente[]>;

  constructor(private firestore: Firestore) {
    // Realizamos una consulta para obtener el listado de clientes
    this.clientesRef = collection(this.firestore, 'clientes');
    const consulta = query(this.clientesRef, orderBy('nombre', 'asc'));
    this.clientes = collectionData(consulta, {idField: 'id'}) as Observable<Cliente[]>;
  }

  getClientes(): Observable<Cliente[]>{
    return this.clientes;
  }

  agregarCliente(cliente: Cliente){
    return addDoc(this.clientesRef, cliente);
  }


}
