import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { FunctionService } from '../../services/function.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  component : string = 'produtos';

  innerGrid : any;
  mode : string = "";
  mensagem : string = "";

  // Comum Functions :::

  toggleScreen : Function;
  selectLookup : Function;

  constructor (private sanitizer : DomSanitizer,private functionService : FunctionService ) {

    // Declaring Commum functions :::

    this.toggleScreen = functionService.toggleScreen;
    this.selectLookup = functionService.selectLookup;

    
    if(typeof document != "undefined"){
      this.dataGrid()
    }
  }

  // Complement to dataGrid in functionService :::
  async dataGrid ( ) {
    this.innerGrid = this.sanitizer.bypassSecurityTrustHtml(
      await this.functionService.dataGrid(this.component)
    )
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
      
      if(data && data.sucess != undefined){

        for(let i = 0; i < document.querySelectorAll('.data-record input, select, textarea').length; i++){
          (document.querySelectorAll('.data-record input, select, textarea')[i] as HTMLInputElement).toggleAttribute('disabled')
        }

        this.mode = "Consultando"

      } else if(data && data.falied != undefined){

        this.mensagem = "Código já está sendo utilizado em outro registro."

      }
    })
  }

  inputValidates ( ) {

    for(let i = 0; i < document.querySelectorAll('#codigo, #nome, #medida, #centro_custo, #almoxarifado').length; i++){
      if((document.querySelectorAll('#codigo, #nome, #medida, #centro_custo, #almoxarifado')[i] as HTMLInputElement).value == ""){
        (document.querySelectorAll('#codigo, #nome, #medida, #centro_custo, #almoxarifado')[i] as HTMLInputElement).setAttribute('style','border: 1px solid red;')

        this.mensagem = "Campos em vermelho são Obrigatórios.";

      } else if ((document.querySelectorAll('#codigo, #nome, #medida, #centro_custo, #almoxarifado')[i] as HTMLInputElement).getAttribute('style')){
        (document.querySelectorAll('#codigo, #nome, #medida, #centro_custo, #almoxarifado')[i] as HTMLInputElement).removeAttribute('style')
      
      }
    }
    
    for(let i = 0; i < document.querySelectorAll('#codigo, #nome, #medida, #centro_custo, #almoxarifado').length; i++){
      if((document.querySelectorAll('#codigo, #nome, #medida, #centro_custo, #almoxarifado')[i] as HTMLInputElement).getAttribute('style')){
        return
      }
    }

    this.mensagem = "";
    this.newRecord();
  }
  
}