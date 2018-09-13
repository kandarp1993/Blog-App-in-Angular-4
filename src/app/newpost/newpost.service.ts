import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {LoginService} from '../auth/login.service'
import {Router} from '@angular/router'




@Injectable({
  providedIn: 'root'
})
export class NewpostService {

  userData = {};
  constructor(private _http: HttpClient,private _loginService : LoginService, private _router: Router) { 
   
  }

  addNewPost(data){
    console.log(data)
    this._http.post("http://localhost:3000/newpost",data).subscribe((res : any)=>{
        if(res.msg){
         this._router.navigateByUrl('/posts')
        }
    })
  }
}
