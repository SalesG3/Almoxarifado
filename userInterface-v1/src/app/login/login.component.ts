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
    
    let req = await fetch('http://localhost:8000/',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        usuario: (document.getElementById('usuario') as HTMLInputElement).value,
        senha: (document.getElementById('senha') as HTMLInputElement).value,
      })
    })
    .then(res => res.json()).then(data => {
      this.service.sessao = data.sucess
      this.router.navigate(['menu'])
    })
  }
}
