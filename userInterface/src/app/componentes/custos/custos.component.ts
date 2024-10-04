import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-custos',
  standalone: true,
  imports: [],
  templateUrl: './custos.component.html',
  styleUrl: './custos.component.css'
})
export class CustosComponent {
  innerGrid : any;
  modo : string = "";
  mensagem : string = "";
  registroID : number = 0;

  constructor (private sanitizer:DomSanitizer ) { }


  // Carrega os Registros e Insere na GRID
  async dadosGrid ( ) {
    let request = await fetch('http://localhost:8000/grid/custos',{
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        busca: (document.querySelector('#pesquisa') as HTMLInputElement).value.replaceAll(' ','%%')
      })
    }).then(response => {
      if(response.ok){ return response.json()} else { console.log(response); return}
    })

    let texto : string = "";
    for( let i = 0; i < request.length; i++ ) {
      texto += 
      `<tr id="${request[i].id}"><td class="codigo">${String(request[i].codigo).padStart(2,'0')}</td>
      <td class="nome">${request[i].nome}</td></tr>`
    }

    document.querySelector('#bodyTable')?.addEventListener('click', (event) => {
      if(event.target == document.querySelector('#bodyTable')){ return }

      if (document.querySelector('.focus')){ document.querySelector('.focus')?.classList.remove('focus') }
      ((event.target as HTMLElement).parentNode as HTMLTableRowElement).classList.add('focus')
    })

    return this.innerGrid = this.sanitizer.bypassSecurityTrustHtml(texto);
  }


  // Consulta Registro Individual
  async consultarRegistro ( ){
    let id = document.querySelector('.focus')?.id;
    if(id == undefined || id == ""){ return false}

    let request = await fetch(`http://localhost:8000/custos/${id}`).then(response => {
      if(response.ok){ return response.json()} else {console.log(response); return false}
    });

    (document.querySelector('#codigo') as HTMLInputElement).value = String(request[0].codigo).padStart(2,'0');
    (document.querySelector('#nome') as HTMLInputElement).value = request[0].nome;

    return this.registroID = request[0].id;
  }


  // Alterna entre as Telas
  async alternarTelas (modo : string ) {
    
    switch ( modo ) {

      case "Incluindo":
        document.querySelector('#GRID')?.setAttribute('hidden','');
        document.querySelector('#detalhamento')?.removeAttribute('hidden');
        document.querySelector('#salvar-cancelar')?.removeAttribute('hidden');

        for(let i = 0; i < document.querySelectorAll('.ferramentas button').length; i++){
          document.querySelectorAll('.ferramentas button')[i]?.setAttribute('disabled','')
        };

        document.querySelector('#salvar')?.removeAttribute('disabled');
        for(let i = 0; i < document.querySelectorAll('.dados-componente input, select, textarea').length; i++){
          (document.querySelectorAll('.dados-componente input, select, textarea')[i] as HTMLInputElement).value = "";
          document.querySelectorAll('.dados-componente input, select, textarea')[i].removeAttribute('style');
          document.querySelectorAll('.dados-componente input, select, textarea')[i].removeAttribute('disabled');
        }

        await this.codigoDisponivel( modo );
        break;

      case "Alterando":
        if(await this.consultarRegistro() == false) { return }
        document.querySelector('#GRID')?.setAttribute('hidden','');
        document.querySelector('#detalhamento')?.removeAttribute('hidden');
        document.querySelector('#salvar-cancelar')?.removeAttribute('hidden');

        for(let i = 0; i < document.querySelectorAll('.ferramentas button').length; i++){
          (document.querySelectorAll('.ferramentas button')[i] as HTMLButtonElement).setAttribute('disabled','')
        }

        document.querySelector('#salvar')?.removeAttribute('disabled');
        for(let i = 0; i < document.querySelectorAll('.dados-componente input, select, textarea').length; i++){
          document.querySelectorAll('.dados-componente input, select, textarea')[i].removeAttribute('style');
          document.querySelectorAll('.dados-componente input, select, textarea')[i].removeAttribute('disabled');
        }

        await this.codigoDisponivel( modo );
        break;

      case "Consultando":
        if(await this.consultarRegistro() == false) { return }
        document.querySelector('#GRID')?.setAttribute('hidden','');
        document.querySelector('#detalhamento')?.removeAttribute('hidden');
        document.querySelector('#salvar-cancelar')?.removeAttribute('hidden');

        document.querySelector('#salvar')?.setAttribute('disabled','');

        for(let i = 0; i < document.querySelectorAll('.dados-componente input, select, textarea').length; i++){
          document.querySelectorAll('.dados-componente input, select, textarea')[i].setAttribute('disabled','');
        }
        break;
      
      case "":
        document.querySelector('#GRID')?.removeAttribute('hidden');
        document.querySelector('#detalhamento')?.setAttribute('hidden','');
        document.querySelector('#salvar-cancelar')?.setAttribute('hidden','');

        for(let i = 0; i < document.querySelectorAll('.ferramentas button').length; i++){
          (document.querySelectorAll('.ferramentas button')[i] as HTMLButtonElement).removeAttribute('disabled')
        }

        for(let i = 0; i < document.querySelectorAll('.dados-componente input, select, textarea').length; i++){
          (document.querySelectorAll('.dados-componente input, select, textarea')[i] as HTMLInputElement).value = "";
          document.querySelectorAll('.dados-componente input, select, textarea')[i].removeAttribute('style');
          document.querySelectorAll('.dados-componente input, select, textarea')[i].removeAttribute('disabled');
        }

        this.registroID = 0;
        break;
    }

    return this.modo = modo;
  }


  // Salva registro de acordo com Modo
  salvarRegistro ( ) {

    for (let i = 0; i < document.querySelectorAll('#detalhamento input').length; i++ ) {
      let input = (document.querySelectorAll('#detalhamento input')[i] as HTMLInputElement);

      if(input.value == ""){
        input.setAttribute('style','border: 1px solid red;')
        this.mensagem = "Campos em vermelho são Obrigatórios.";

      } else if (input.getAttribute('style')){
        input.removeAttribute('style')
      }
    }
    
    for(let i = 0; i < document.querySelectorAll('input').length; i++){
      if((document.querySelectorAll('input')[i] as HTMLElement).getAttribute('style')){ return }
    }

    this.mensagem = "";

    switch(this.modo){
      case "Incluindo":
        this.novoRegistro()
        break;
      
      case "Alterando":
        this.alterarRegistro()
        break;
    }
  }


  // Novo Registro
  async novoRegistro ( ) {

    let request = await fetch('http://localhost:8000/custos', {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        codigo:(document.querySelector('#codigo') as HTMLInputElement).value,
        nome:(document.querySelector('#nome') as HTMLInputElement).value,
      })
    }).then( response => { if(response.ok){return response.json()} else {console.log(response); return } })
    
    if(request.sucesso){
      this.dadosGrid();
      this.alternarTelas("");
    }

    if(request.duplicado){
      document.querySelector('#codigo')?.setAttribute('style','border: 1px solid red');
      this.mensagem = "Este Código já em utilização!"
    }
  }


  // Alterar Registro
  async alterarRegistro ( ) {

    let request = await fetch(`http://localhost:8000/custos/${this.registroID}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        codigo:(document.querySelector('#codigo') as HTMLInputElement).value,
        nome: (document.querySelector('#nome') as HTMLInputElement).value
      })
    }).then(response => { if(response.ok){return response.json()} else {console.log(request); return }})

    if(request.duplicado){
      document.querySelector('#codigo')?.setAttribute('style','border: 1px solid red');
      this.mensagem = "Este Código já em utilização!"
    }

    if(request.erro){
      this.mensagem = "Inconsistência Interna. Entrar em contato com Suporte!"
    }
    
    if(request.sucesso){
      this.dadosGrid();
      this.alternarTelas("");
    }
  }

  async codigoDisponivel ( modo : string ) {
    if(modo == "Incluindo"){
      let request = await fetch('http://localhost:8000/codigo/custos').then(response => response.json());
      (document.querySelector('#codigo') as HTMLInputElement).value = String(request[0].codigo).padStart(2,"0");
    }
    
    (document.querySelector('#codigo') as HTMLInputElement).addEventListener('input', () => {
      let codigo = "";

      for(let i = 0; i < 2; i++){
        if((document.querySelector('#codigo') as HTMLInputElement).value[0] == "0"){
          codigo = (document.querySelector('#codigo') as HTMLInputElement).value.replace('0','');
        }
        else if ((document.querySelector('#codigo') as HTMLInputElement).value[i] != undefined){
          codigo += (document.querySelector('#codigo') as HTMLInputElement).value[i];
        }
      }
      (document.querySelector('#codigo') as HTMLInputElement).value = codigo.padStart(2,'0')
    })
  }

  moverComponente () {

    function adicionarEscuta (event : MouseEvent) {
      let componente = (document.querySelector('.componente') as HTMLElement);

      let leftMax = (document.body.clientWidth - componente.clientWidth);
      if(componente.offsetLeft > leftMax && (event.movementX) > 0){ }
      else if (componente.offsetLeft < 16 && (event.movementX) < 0){ }
      else {componente.style.left = `${componente.offsetLeft + (event.movementX)}px`;}

      let topMax = (document.body.clientHeight - componente.clientHeight -8);
      if(componente.offsetTop > topMax && (event.movementY) > 0) { }
      else if(componente.offsetTop < 16 && (event.movementY) < 0) { }
      else {componente.style.top = `${componente.offsetTop + (event.movementY) -89}px`;}
    }

    function removerEscuta (event : MouseEvent) {
      document.removeEventListener('mousemove', adicionarEscuta);
      titulo.classList.remove('componente-move');
    }

    let titulo = (document.querySelector('.titulo-componente') as HTMLElement);
    titulo.classList.add('componente-move');
    document.addEventListener('mousemove', adicionarEscuta);
    document.addEventListener('mouseup', removerEscuta);
  }
}
