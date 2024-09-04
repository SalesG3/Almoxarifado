import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {
  inner : any;

  constructor(private sanitizer : DomSanitizer){ }

  ngOnInit(): void {

    if(typeof document != undefined){

      let tab = (document.querySelector('#dataTable') as HTMLTableElement);
      var test : string = "";

      for(let i = tab.rows.length; i <= 10; i++){

        test += '<tr><td>teste</td><td>teste</td><td>teste</td></tr>';

      }

      this.inner = this.sanitizer.bypassSecurityTrustHtml(test)
    }
    
  }

}
