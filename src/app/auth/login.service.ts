import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service'
import {Subject,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient,private _router: Router,private _cookie: CookieService) { }

  $authCheck = new BehaviorSubject<any>(this.getToken());

  authenticateUser(data){
    this._http.post("http://localhost:3000/login",data).subscribe((res : any)=>{
      if(res.isLoggedIn){
        this.$authCheck.next(true);
        this._cookie.set('token',res.token);
        this._router.navigateByUrl('/home');
      }
      else{
        alert('Wrong Credentials.')
        this._router.navigateByUrl('/login');
      }
    });
  }
  logoutUser(){
    this._cookie.delete('token');
    this.$authCheck.next(false);
    this._router.navigateByUrl("/login");
  }
  public getToken(): string {
    return  this._cookie.get('token');
  }

}
