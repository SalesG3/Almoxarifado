import { Component } from '@angular/core';

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent {
  registerStatus : string = "Consultando";
}
