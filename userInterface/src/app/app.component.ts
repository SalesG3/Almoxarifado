import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItensComponent } from './itens/itens.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ItensComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'userInterface';

  // VARIÁVEIS TESTE 01 :::
  client = 'Prefeitura de Bom Jesus da Lapa';
  user = 'Gabriel';
  version = '1.00.00';

  showMenu(btn : string) {

    document.querySelector(`#${btn}`)?.classList.toggle('show');

  }
}
