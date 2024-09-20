import { Component, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FunctionService } from '../../services/function.service';
import { FormsModule } from '@angular/forms'
import { InterfaceProduto } from '../../services/interfaces';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  component : string = 'Produtos';
  innerGrid : any;
  mode : string = "";
  mensagem : string = "";
  dataRecord : InterfaceProduto;

  // Comum Functions :::

  toggleScreen : Function;
  selectLookup : Function;
  validateInputs : Function;
  newRecord : Function;
  updateRecord : Function;

  constructor (private sanitizer : DomSanitizer,private functionService : FunctionService) {

    // Declaring main object :::
    this.dataRecord = {
      id:'',
      codigo:'',
      nome:'',
      medida:'',
      marca:'',
      categoria:'',
      localizacao:'',
      centro_custo:'',
      almoxarifado:'',
      descricao:'',
    }

    // Declaring Commum functions :::
    this.newRecord = functionService.newRecord;
    this.toggleScreen = functionService.toggleScreen;
    this.selectLookup = functionService.selectLookup;
    this.validateInputs = functionService.validateInputs;
    this.updateRecord = functionService.updateRecord;
  }

  // Complement to dataGrid in functionService :::
  async dataGrid ( ) {
    this.innerGrid = this.sanitizer.bypassSecurityTrustHtml(
      await this.functionService.dataGrid(this.component)
    )
  }

  // Complement to newRecord in functionService :::
  async saveRecord () {
    if(this.mode == "Incluindo"){
      this.newRecord(
        ['#codigo','#nome','#medida','#centro_custo','#almoxarifado'], this.component, this.dataRecord
      );
    }
    else if(this.mode == "Alterando"){
      this.updateRecord(
        ['#codigo','#nome','#medida','#centro_custo','#almoxarifado'], this.component, this.dataRecord
      );
    }
  }

  // TESTE

  rowIdentify ( ) {

    if(!(document.querySelector('.focus') as HTMLElement)){ return false }
    
    else { return (document.querySelector('.focus') as HTMLElement).id }

  }

  async consultRecord ( ) {
    if(this.rowIdentify() == false){ return false}

    let request = await fetch(`http://localhost:8000/produtos/${this.rowIdentify()}`).then(res => res.json());

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
    console.log(this.dataRecord)
    return
  }
}