import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http : HttpClient, private _router: Router) { }

  saveUser(data){
    this._http.post("http://localhost:3000/signup/",data).subscribe((res)=>{
      if(res){
        this._router.navigate(['/login']);  
      }else{
        alert('User already exist');
        this._router.navigateByUrl('/register');
      }
    });
          

  }
}
