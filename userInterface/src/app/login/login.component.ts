import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/cjs/md5';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  message : string = "";
  userSession : SessionService;

  constructor (private session : SessionService, private router : Router) {

    this.userSession = {
      client: session.client,
      user: session.user,
      version: session.version,
    }
  }

  async userLogin(){

    let req = await fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        userIn : (document.querySelector('#userIn') as HTMLInputElement).value,
        passwordIn : Md5.hashStr((document.querySelector('#passwordIn') as HTMLInputElement).value),
      })
    }).then(res => res.json()).then(data => {

      if(data.falied != undefined){
        this.message = "Usuário e Senha incompatíveis!";

      } else if (data.sucess != undefined){
        this.message = "";
        this.session.user = data.sucess[0].usuario;
        this.router.navigate(['index'])
      }
    })
  }
}

