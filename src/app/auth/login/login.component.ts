import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login : any = {};
  constructor(private _lgnService:LoginService) { }
  ngOnInit() {
  }
  checkUser(){
    this._lgnService.authenticateUser(this.login);
  }
}
