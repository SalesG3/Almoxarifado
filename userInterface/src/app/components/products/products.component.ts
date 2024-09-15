import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  inner : any;
  
  constructor (private sanitizer : DomSanitizer ) {
    if(typeof document != "undefined"){
      this.reqRecords();
    }
  }

  openDetail(){
    (document.querySelector('.grid-table') as HTMLElement).setAttribute('style','display: none');
    (document.querySelector('.detail-record') as HTMLElement).removeAttribute('style')
  }

  async reqRecords () {

    let req = await fetch('http://localhost:8000/produtos')
    .then((req) => req.json()).then((data) => {

      let text : string = "";

      for (let i in data) {
        text += `<tr id="${data[i].id}"><td>${data[i].codigo}</td><td>${data[i].nome}</td><td>${data[i].medida}</td></tr>`;
      }

      this.inner = this.sanitizer.bypassSecurityTrustHtml(text);
      
      (document.querySelector('#bodyTable') as HTMLTableElement).addEventListener('click', (event) => {

        if((document.querySelector('.focus') as HTMLTableElement)){
          (document.querySelector('.focus') as HTMLTableElement).classList.remove('focus')
        }

        ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).classList.add('focus');
      })
    })
  }

  async lookup (tabela : string) {

    let req = await fetch(`http://localhost:8000/${tabela}/`)
    .then(req => req.json()).then((data) => {
      (document.querySelector(`#${tabela}`) as HTMLElement).innerHTML = '<option hidden></option>';

      for(let i in data){
        (document.querySelector(`#${tabela}`) as HTMLElement).innerHTML += 
        `<option value="${data[i].id}">${String(data[i].codigo).padStart(3,'0')} - ${data[i].nome}</option>`
      }
    })
  }
}