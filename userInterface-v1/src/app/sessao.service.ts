import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  autenticacao : string;

  constructor() {
    this.autenticacao = "";
   }
}
