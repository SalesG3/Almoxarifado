import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itens',
  standalone: true,
  imports: [],
  templateUrl: './itens.component.html',
  styleUrl: './itens.component.css'
})
export class ItensComponent implements OnInit {

  registerStatus : string = "Consultando";

  ngOnInit(): void {
    
  }

  cadastrar(){

    document.querySelector('.CRUD')?.classList.toggle('hidden');
    document.querySelector('.detailMode')?.classList.toggle('showNav');

    document.querySelector('.detalhesItem')?.classList.toggle('show');
    document.querySelector('.bodyMain')?.classList.toggle('hidden');

  }
}
