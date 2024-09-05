import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})

export class ProdutosComponent implements OnInit {

  inner : any;
  mode: string = "";

  constructor(private sanitizer : DomSanitizer, private router: Router){ }

  ngOnInit(): void {

    if(typeof document != "undefined"){

      let tab = (document.querySelector('#dataTable') as HTMLTableElement);
      let test : string = "";

      for(let i = tab.rows.length; i <= 15; i++){

        test += '<tr><td></td><td></td><td></td></tr>';

      }

      this.inner = this.sanitizer.bypassSecurityTrustHtml(test)
    }
  }

  openScreen(tela: string){
    this.mode = tela;
    document.querySelector('table')?.toggleAttribute('hidden')

    let nav = (document.querySelector('.ferramentas') as HTMLElement).children;

    for(let i = 0; i < 4 && nav[i] as HTMLButtonElement; i++){
      nav[i].setAttribute('disabled','');
      nav[i].setAttribute('style','cursor: default;');
    }

    this.router.navigate(['/menu/produtos/id'])
  }

  closeScreen(){

    let nav = (document.querySelector('.ferramentas') as HTMLElement).children;

    for(let i = 0; i < 4 && nav[i] as HTMLButtonElement; i++){
      nav[i].removeAttribute('disabled');
      nav[i].removeAttribute('style');
    }

    document.querySelector('table')?.toggleAttribute('hidden')
  }
}
