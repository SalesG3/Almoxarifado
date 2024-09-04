import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  sessao : string;

  constructor() {
    this.sessao = "5";
   }
}
