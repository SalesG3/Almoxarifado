import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FunctionService } from '../../services/function.service';
import { interfaceCategory } from '../../services/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  component : string = 'Categorias';
  innerGrid : any;
  mode : string = "";
  mensagem : string = "";
  dataRecord : interfaceCategory;

  // Comum Functions :::

  toggleScreen : Function;
  selectLookup : Function;
  validateInputs : Function;
  newRecord : Function;
  updateRecord : Function;
  consultRecord : Function;
  defaultValue : interfaceCategory;

  constructor (private sanitizer : DomSanitizer,private functionService : FunctionService) {


    // Declaring main object :::
    this.defaultValue = {
      id:'',
      codigo:'',
      nome:'',
      ativo: true,
      descricao: ''
    }
    
    this.dataRecord = this.defaultValue;

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
        ['#codigo','#nome'], this.component, this.dataRecord
      );
    }
    else if(this.mode == "Alterando"){
      this.updateRecord(
        ['#codigo','#nome'], this.component, this.dataRecord
      );
    }
  }
}
