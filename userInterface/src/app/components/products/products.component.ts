import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  async lookup (tabela : string) {

    let req = await fetch(`http://localhost:8000/${tabela}/`)
    .then(req => req.json()).then((data) => {
      (document.querySelector(`#${tabela}`) as HTMLElement).innerHTML = '<option hidden></option>';

      for(let i in data){
        (document.querySelector(`#${tabela}`) as HTMLElement).innerHTML += 
        `<option value="${data[i].id}">${data[i].nome}</option>`
      }
    })
  }
}
