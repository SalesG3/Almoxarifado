import { Component, OnInit } from '@angular/core';
import { SessaoService } from '../sessao.service';
import { Router, RouterOutlet } from '@angular/router';
import { ProdutosComponent } from '../produtos/produtos.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, ProdutosComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  cliente = {
    entidade: "Bom Jesus da Lapa",
    usuario: "undefined",
    versao: "1.0.00"
  }

  constructor(private service: SessaoService, private router: Router){

    if(this.service.sessao == ""){
      this.router.navigate([""])
    }

  }

  listDown(btn : string){
    document.querySelector(`#${btn}`)?.classList.toggle('show')
  }

  openScreen(btn: string){
    this.router.navigate([`/menu/${btn}`])
  }

  logOut(){
    this.service.sessao = "";
    this.router.navigate([""]);
  }

  
}
