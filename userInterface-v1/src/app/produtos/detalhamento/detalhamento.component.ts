import { Component } from '@angular/core';
import { ProdutosComponent } from '../produtos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhamento',
  standalone: true,
  imports: [ProdutosComponent],
  templateUrl: './detalhamento.component.html',
  styleUrl: './detalhamento.component.css'
})
export class DetalhamentoComponent {
  mode : string;
  
  constructor(private compProdutos : ProdutosComponent, private router : Router){
    
    this.mode = this.compProdutos.mode

    if(this.mode == ""){
      router.navigate(['/menu/produtos'])
    }
  }

  async salvar(){

    let req = await fetch('http://localhost:8000/produtos', {
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        codigo: (document.querySelector('#codigo') as HTMLInputElement).value,
        produto: (document.querySelector('#produto') as HTMLInputElement).value,
        descricao: (document.querySelector('#descricao') as HTMLInputElement).value,
        medida: (document.querySelector('#medida') as HTMLInputElement).value,
      })
    })
    .then(req => req.json()).then((data) => {
      
      if(data.falied){alert(data.falied); return}

      alert('Produto registrado!')
      this.mode = "";
      this.compProdutos.closeScreen();
      this.router.navigate(['/menu/produtos'])
    })
  }

  closeScreen(){
    this.mode = "";
    this.router.navigate(['/menu/produtos'])
    this.compProdutos.closeScreen()
  }
}

