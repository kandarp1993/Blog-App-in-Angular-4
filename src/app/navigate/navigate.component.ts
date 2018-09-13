import { Component, OnInit } from '@angular/core';
import {LoginService} from '../auth/login.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {

  constructor(private _logservice: LoginService) { }

  isLoggedIn : boolean = false;

  ngOnInit() {
    this._logservice.$authCheck.subscribe((data)=>{
      this.isLoggedIn = data;
    });
  }
  logout(){
    this._logservice.logoutUser();
  }
  
}
