import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements AfterViewInit {

  inner : any;

  constructor ( ) {  }

  ngAfterViewInit(): void {
    this.lookup()
  }

  async lookup ( ) {

    let req = await fetch('http://localhost:8000/categorias/')
    .then(req => req.json()).then((data) => {

      for(let i in data){
        (document.querySelector('#categoria') as HTMLElement).innerHTML += `<option>${data[i].nome}</option>`
      }
    })
  }
}
