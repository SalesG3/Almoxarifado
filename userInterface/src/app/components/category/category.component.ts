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

  component : string = 'categorias';
  dataRecord : interfaceCategory;

  innerGrid : any;
  mode : string = "";
  mensagem : string = "";

  // Comum Functions :::

  toggleScreen : Function;
  selectLookup : Function;
  validateInputs : Function;
  

  constructor (private sanitizer : DomSanitizer,private functionService : FunctionService ) {

    // Declaring main object :::
    this.dataRecord = { codigo:'', nome:''}

    // Declaring Commum functions :::

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
  async newRecord ( ) {
    this.functionService.newRecord(
      ['#codigo','#nome','#medida','#centro_custo','#almoxarifado'], this.component, this.dataRecord
    )
  }
}
