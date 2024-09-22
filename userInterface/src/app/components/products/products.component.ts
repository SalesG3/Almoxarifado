import { Component } from '@angular/core';
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
  defaultValue : InterfaceProduto;

  // Comum Functions :::

  toggleScreen : Function;
  selectLookup : Function;
  validateInputs : Function;
  newRecord : Function;
  updateRecord : Function;
  consultRecord : Function;

  constructor (private sanitizer : DomSanitizer,private functionService : FunctionService) {

    // Declaring main object :::
    this.defaultValue = {
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
    };

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