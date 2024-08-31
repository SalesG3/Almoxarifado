import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //TESTE

  cliente = {
    entidade: "Bom Jesus da Lapa",
    usuario: "undefined",
    versao: "1.0.00"
  }
}
