import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {HttpInterceptor,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(public auth: LoginService) {}

  intercept(req,next) {
    
    var authRequest = req.clone({
      headers: new HttpHeaders().set('authtoken',this.auth.getToken())
    });

    return next.handle(authRequest);
  }
}


