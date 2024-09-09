import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  client : string;
  user : string;
  version : string;

  constructor() {
    this.client = "Várzea Nova";
    this.user = "";
    this.version = "1.0.0";
  }
}
