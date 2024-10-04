import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  userSession : SessionService;

  constructor (private session : SessionService, private router: Router) {

    //if(session.user == ""){ router.navigate(['/'])} Validação para não permitir login sem usuário logado. Desativado para desenvolvimento

    this.userSession = {
      client: session.client,
      user: session.user,
      version: session.version,
    }
  }

  logOut(){
    this.session.user = "";
    this.router.navigate([''])
  }

  listDown(even : HTMLButtonElement){

    let listDown = (document.querySelector(`#${even.value}`) as HTMLElement);

    listDown.classList.toggle('show');
    listDown.style.left = `${even.offsetLeft}px`;

    document.addEventListener('click',function click (event){

      if(event.target != listDown && event.target != even){
        listDown.classList.remove('show');

        document.removeEventListener('click', click )
      }
    })
  }
}
