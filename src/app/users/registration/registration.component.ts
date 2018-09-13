import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RegistrationService} from '../registration.service'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user : any = {};
  constructor(private regservice : RegistrationService) { }

  ngOnInit() {
  }
  signup(){
    this.regservice.saveUser(this.user);
  }
}
