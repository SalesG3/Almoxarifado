import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  mode : string = "";
  mensagem : string = "";
  dataRecord : any;

  constructor(private sanitizer : DomSanitizer) { }

  // Toggle in grid table and record detail ::: Complet
  async toggleScreen(mode : string){

    switch ( mode ) {

      case "Incluindo":
        document.querySelector('#grid-table')?.setAttribute('hidden','');
        document.querySelector('#detail-record')?.removeAttribute('hidden');
        document.querySelector('#save-cancel')?.removeAttribute('hidden');

        for(let i = 0; i < document.querySelectorAll('.crud button').length; i++){
          document.querySelectorAll('.crud button')[i]?.setAttribute('disabled','')
        };

        document.querySelector('#save')?.removeAttribute('disabled');
        for(let i = 0; i < document.querySelectorAll('.detail-record input, select, textarea').length; i++){
          (document.querySelectorAll('.detail-record input, select, textarea')[i] as HTMLInputElement).value = "";
          document.querySelectorAll('.detail-record input, select, textarea')[i].removeAttribute('style');
          document.querySelectorAll('.detail-record input, select, textarea')[i].removeAttribute('disabled');
        }
        break;

      case "Alterando":
        if(await this.consultRecord() == false){ return }
        document.querySelector('#grid-table')?.setAttribute('hidden','');
        document.querySelector('#detail-record')?.removeAttribute('hidden');
        document.querySelector('#save-cancel')?.removeAttribute('hidden');

        for(let i = 0; i < document.querySelectorAll('.crud button').length; i++){
          (document.querySelectorAll('.crud button')[i] as HTMLButtonElement).setAttribute('disabled','')
        }

        document.querySelector('#save')?.removeAttribute('disabled');
        for(let i = 0; i < document.querySelectorAll('.detail-record input, select, textarea').length; i++){
          document.querySelectorAll('.detail-record input, select, textarea')[i].removeAttribute('style');
          document.querySelectorAll('.detail-record input, select, textarea')[i].removeAttribute('disabled');
        }
        break;

      case "Consultando":
        if(await this.consultRecord() == false) { return }
        document.querySelector('#grid-table')?.setAttribute('hidden','');
        document.querySelector('#detail-record')?.removeAttribute('hidden');
        document.querySelector('#save-cancel')?.removeAttribute('hidden');

        document.querySelector('[value="Consultando"')?.setAttribute('disabled','');
        document.querySelector('#save')?.setAttribute('disabled','');

        for(let i = 0; i < document.querySelectorAll('.data-record input, select, textarea').length; i++){
          document.querySelectorAll('.data-record input, select, textarea')[i].setAttribute('disabled','');
        }
        break;
      
      case "Deletando":
        console.log('Delet Comand')
        break;

      case "":
        document.querySelector('#grid-table')?.removeAttribute('hidden');
        document.querySelector('#detail-record')?.setAttribute('hidden','');
        document.querySelector('#save-cancel')?.setAttribute('hidden','');

        for(let i in this.dataRecord){this.dataRecord[i] = '';}

        for(let i = 0; i < document.querySelectorAll('.toolbar button').length; i++){
          (document.querySelectorAll('.toolbar button')[i] as HTMLButtonElement).removeAttribute('disabled')
        }

        for(let i = 0; i < document.querySelectorAll('.detail-record input, select, textarea').length; i++){
          (document.querySelectorAll('.detail-record input, select, textarea')[i] as HTMLInputElement).value = "";
          document.querySelectorAll('.detail-record input, select, textarea')[i].removeAttribute('style');
          document.querySelectorAll('.detail-record input, select, textarea')[i].removeAttribute('disabled');
        }
        break;
    }

    this.mode = mode;
    this.mensagem = "";
  }

  // Request and insert options with values integrated ::: Complet
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

  // Request for records of grid ::: Complet
  async dataGrid (table : string) {

    let request = await fetch(`http://localhost:8000/${table}`).then(response => response.json())
    let text : string = "";
    for (let i in request) { text += '<tr id='+ request[i].id +'>'
      for (let j in request[i]){
        if(j == 'codigo'){text += `<td class="${j}">` + String(request[i][j]).padStart(3, '0') + '</td>';}
        else if(j != 'id'){ text += `<td class="${j}">` + request[i][j] + '</td>'; }

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

  //Validate inputs requireds and return boolean ::: Complet
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

  // Request for a uptade row
  async updateRecord(required : string[], table : string, record : object){

    if(this.validateInputs(required) == false){ return }

    let request = await fetch(`http://localhost:8000/${table}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(record)
    }).then(response => {
      if (response.ok) { return response.json()} else {console.log(response.status +' '+ response.statusText);
        this.mensagem = 'Inconsistência Interna! Entrar em contato com Fator Sistemas'; return}
    });
    this.toggleScreen("");
    this.dataGrid(table)
  }

  // Request for a consult especifiqued data row :::
  async consultRecord ( ) {
    if(!(document.querySelector('.focus') as HTMLElement)){ return false };
    let rowID = (document.querySelector('.focus') as HTMLElement).id;

    let request = await fetch(`http://localhost:8000/produtos/${rowID}`).then(res => res.json());

    let select = (document.querySelectorAll('.lookup'));
    for(let i = 0; i < select.length; i++){

      if(request[0][0].hasOwnProperty(select[i].id) == true && request[0][0][select[i].id].id != null){
        let key = request[0][0][select[i].id];
        
        (document.querySelector(`#${select[i].id}`) as HTMLSelectElement).innerHTML =
        `<option value="${key.id}"> ${String(key.codigo).padStart(3, '0')} - ${key.nome}</option>`;

        request[0][0][select[i].id] = key.id;
      }
      else { request[0][0][select[i].id] = ''; }
    }
    this.dataRecord = request[0][0];
    return
  }
}
