import { Component } from '@angular/core';
import { ProdutosComponent } from '../produtos.component';

@Component({
  selector: 'app-detalhamento',
  standalone: true,
  imports: [ProdutosComponent],
  templateUrl: './detalhamento.component.html',
  styleUrl: './detalhamento.component.css'
})
export class DetalhamentoComponent {
  mode : string;
  
  constructor(private compProdutos : ProdutosComponent){
    
    this.mode = this.compProdutos.mode

  }

  async salvar(){

    let req = await fetch('http://localhost:8000/produtos', {
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        codigo: (document.querySelector('#codigo') as HTMLInputElement).value,
        nome: (document.querySelector('#produto') as HTMLInputElement).value,
        descricao: (document.querySelector('#descricao') as HTMLInputElement).value,
        medida: (document.querySelector('#medida') as HTMLInputElement).value,
      })
    })
  }
}

