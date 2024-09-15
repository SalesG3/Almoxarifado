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

  toggleScreen(){
    (document.querySelector('#grid-table') as HTMLElement).toggleAttribute('hidden');
    (document.querySelector('#detail-record') as HTMLElement).toggleAttribute('hidden');
    (document.querySelector('.save') as HTMLDivElement).toggleAttribute('hidden');

    for(let i = 0; i < document.querySelectorAll('.crud button').length; i++){
      (document.querySelectorAll('.crud button')[i] as HTMLButtonElement).toggleAttribute('disabled')
    }
  }

  async newRecord(){
    
    let request = await fetch('http://localhost:8000/produtos', {
      method: "POST",
      headers: { "Content-Type":"application/json"},
      body: JSON.stringify({
        codigo : (document.querySelector('#codigo') as HTMLInputElement).value,
        nome : (document.querySelector('#nome') as HTMLInputElement).value,
        marca : (document.querySelector('#marca') as HTMLInputElement).value,
        medida : (document.querySelector('#medida') as HTMLInputElement).value,
        categoria : (document.querySelector('#categoria') as HTMLSelectElement).value,
        localizacao : (document.querySelector('#localizacao') as HTMLSelectElement).value,
        centro_custo : (document.querySelector('#centro_custo') as HTMLSelectElement).value,
        almoxarifado : (document.querySelector('#almoxarifado') as HTMLSelectElement).value,
        descricao : (document.querySelector('#descricao') as HTMLInputElement).value
      })
    })
    .then(response => response.json()).then(data => {
      console.log(data)
    })
  }
  

  async reqRecords () {

    let req = await fetch('http://localhost:8000/produtos')
    .then((req) => req.json()).then((data) => {

      let text : string = "";

      for (let i in data) {
        text += `<tr id="${data[i].id}"><td>${String(data[i].codigo).padStart(4,'0')}</td><td>${data[i].nome}</td><td>${data[i].medida}</td></tr>`;
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

    let req = await fetch(`http://localhost:8000/lookup/${tabela}/`)
    .then(req => req.json()).then((data) => {
      (document.querySelector(`#${tabela}`) as HTMLElement).innerHTML = '<option hidden></option>';

      for(let i in data){
        (document.querySelector(`#${tabela}`) as HTMLElement).innerHTML += 
        `<option value="${data[i].id}">${String(data[i].codigo).padStart(3,'0')} - ${data[i].nome}</option>`
      }
    })
  }
}