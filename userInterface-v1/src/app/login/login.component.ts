import { Component } from '@angular/core';
import { response } from 'express';

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
  
  async login(){
    let req = await fetch('http://localhost:8000/')
    .then(response => response.json())
    .then(data => {
      for( let i in data){
        console.log(data[i])
      }
    })
  }
}
