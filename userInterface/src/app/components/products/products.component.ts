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
  dataRecord : InterfaceProduto;

  innerGrid : any;
  mode : string = "";
  mensagem : string = "";

  // Comum Functions :::

  toggleScreen : Function;
  selectLookup : Function;
  validateInputs : Function;
  newRecord : Function;

  

  constructor (private sanitizer : DomSanitizer,private functionService : FunctionService) {

    // Declaring main object :::
    this.dataRecord = { codigo:'', nome:'', medida:'', marca:'', categoria:'',
      localizacao:'', centro_custo:'',almoxarifado:'', descricao:'',
    }

    // Declaring Commum functions :::
    this.newRecord = functionService.newRecord;
    this.toggleScreen = functionService.toggleScreen;
    this.selectLookup = functionService.selectLookup;
    this.validateInputs = functionService.validateInputs;

    
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

  // Complement to newRecord in functionService :::
  async saveRecord ( ) {
     this.newRecord(
      ['#codigo','#nome','#medida','#centro_custo','#almoxarifado'], this.component, this.dataRecord
    );
  }

  // TESTE 

  async consultRecord ( ) {

    let rows = (document.querySelectorAll('tr'))
    let recordID

    for(let i = 0; i < rows.length; i++){
      if((rows[i] as HTMLElement).classList.contains('focus')){
        recordID = (rows[i] as HTMLElement).id;
      }
    }

    if(!recordID){ return }

    let request = await fetch(`http://localhost:8000/produtos/${recordID}`).then(res => res.json());

    this.toggleScreen();



  }
}