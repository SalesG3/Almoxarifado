import { Component, OnInit } from '@angular/core';
import { SessaoService } from '../sessao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{


  constructor(public service: SessaoService, public router: Router){
    
    console.log(service.autenticacao)
    // console {5} como desejado
  }

  ngOnInit(): void {
    if(this.service.autenticacao == ""){
      this.router.navigate([""])
    }
  }
}
