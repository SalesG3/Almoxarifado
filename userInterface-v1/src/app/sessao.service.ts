import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  autenticacao : string;

  constructor() {
    // PARA ESTILIZAR O COMPONENT 'MENU'
    this.autenticacao = "5";
   }
}
