import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessaoService } from '../sessao.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  cliente = {
    entidade: "Bom Jesus da Lapa",
    usuario: "undefined",
    versao: "1.0.00"
  }

  constructor(private router: Router,public service: SessaoService){}
  
  async login(){
    let req = await fetch(`http://localhost:8000/`)
    .then(response => response.json()).then(data => {
      
      let usuario = (document.querySelector('#usuario') as HTMLInputElement).value;
      let senha = (document.querySelector('#senha') as HTMLInputElement).value;
      
      for(let i in data){
        if(data[i].usuario == usuario && data[i].senha == senha){
          this.service.autenticacao = data[i].id;
          
          this.router.navigate(['/menu'])
        }
      }
    })
  }
}
