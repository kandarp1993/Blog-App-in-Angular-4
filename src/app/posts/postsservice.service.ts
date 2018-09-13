import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsserviceService {

  constructor(private _http:HttpClient, private _router:Router) { }
  data : any = [];

  getAllPosts(){
    return this._http.get("http://localhost:3000/allpost");
  }
  deletePostById(id){
    var obj={'id':id};
    return this._http.post("http://localhost:3000/deletepost",obj);
  }
  likePostById(id){
    var obj = {'id':id};
    return this._http.post("http://localhost:3000/likepost",obj);
  }
}
