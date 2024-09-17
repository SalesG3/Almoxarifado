import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  mode : string = "";
  mensagem : string = "";

  constructor(private sanitizer : DomSanitizer) { }

  // Toggle in grid table and record detail :::
  toggleScreen(mode : string){
    
    (document.querySelector('#grid-table') as HTMLElement).toggleAttribute('hidden');
    (document.querySelector('#detail-record') as HTMLElement).toggleAttribute('hidden');
    (document.querySelector('.save') as HTMLDivElement).toggleAttribute('hidden');

    for(let i = 0; i < document.querySelectorAll('.crud button').length; i++){
      (document.querySelectorAll('.crud button')[i] as HTMLButtonElement).toggleAttribute('disabled')
    }

    for(let i = 0; i < document.querySelectorAll('.detail-record input, select, textarea').length; i++){
      (document.querySelectorAll('.detail-record input, select, textarea')[i] as HTMLInputElement).value = "";
      (document.querySelectorAll('.detail-record input, select, textarea')[i] as HTMLInputElement).removeAttribute('style');
    }

    this.mode = mode;
    this.mensagem = "";
  }

  // Request and insert options with values integrated :::
  async selectLookup (tabela : string) {

    let req = await fetch(`http://localhost:8000/lookup/${tabela}/`)
    .then(req => req.json()).then((data) => {
      (document.querySelector(`#${tabela}`) as HTMLElement).innerHTML = '<option hidden></option>';

      for(let i in data){
        (document.querySelector(`#${tabela}`) as HTMLElement).innerHTML += 
        `<option value="${data[i].id}">${String(data[i].codigo).padStart(3,'0')} - ${data[i].nome}</option>`
      }
    })
  }

  // Request for records of grid :::
  async dataGrid (table : string) {

    let request = await fetch(`http://localhost:8000/${table}`).then(response => response.json())
    let text : string = "";

    for (let i in request) { text += '<tr value='+ request[i].id +'>'

      for (let j in request[i]){
        if(j != 'id'){ text += `<td class="${j}">` + request[i][j] + '</td>'; }

      } text += '</td>'
    };

    (document.querySelector('#bodyTable') as HTMLTableElement).addEventListener('click', (event) => {

      if((document.querySelector('.focus') as HTMLTableElement)){
        (document.querySelector('.focus') as HTMLTableElement).classList.remove('focus')
      }

      ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).classList.add('focus');
    })

    return text
  }

  //Validate inputs requireds and return boolean :::
  validateInputs (required : string[]) {

    let requiredInputs = document.querySelectorAll(required.toString());

    for(let i = 0; i < requiredInputs.length; i++){
      if((requiredInputs[i] as HTMLInputElement).value == ""){
        (requiredInputs[i] as HTMLInputElement).setAttribute('style','border: 1px solid red;')

        this.mensagem = "Campos em vermelho são Obrigatórios.";

      } else if ((requiredInputs[i] as HTMLInputElement).getAttribute('style')){
        (requiredInputs[i] as HTMLInputElement).removeAttribute('style')
      
      }
    }
    
    for(let i = 0; i < requiredInputs.length; i++){
      if((requiredInputs[i] as HTMLInputElement).getAttribute('style')){
        return false
      }
    }

    this.mensagem = "";
    return true
  }

  // Request for a POST a new record
  async newRecord(required : string[], table : string, record : object){

    if(this.validateInputs(required) == false){ return }

    let request = await fetch(`http://localhost:8000/${table}`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(record)
    }).then(response => {
      if (response.ok) { return response.json()} else {console.log(response.status + response.statusText);
        this.mensagem = 'Inconsistência Interna! Entrar em contato com Fator Sistemas'; return}
    });

    if(request.sucess){
      this.toggleScreen("");
      this.dataGrid(table)
    }

    if(request.falied){
      (document.querySelector('#codigo') as HTMLElement).setAttribute('style','border: 1px solid red;');
      this.mensagem = 'Código já está sendo utilizado em outro registro!';
    }
  }
}
