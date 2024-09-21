import { Component } from '@angular/core';

/* Importar*/
import { DomSanitizer } from '@angular/platform-browser';
import { FunctionService } from '../services/function.service';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent {
  component : string = 'Produtos';
  innerGrid : any;
  mode : string = "";
  mensagem : string = "";
  dataRecord : Object;

  // Comum Functions :::

  toggleScreen : Function;
  selectLookup : Function;
  validateInputs : Function;
  newRecord : Function;
  updateRecord : Function;
  consultRecord : Function;

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
    this.consultRecord = functionService.consultRecord;
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
}
