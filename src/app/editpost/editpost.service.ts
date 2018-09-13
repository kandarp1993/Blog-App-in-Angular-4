import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditpostService {

  editOption : any = [];
  constructor(private _http: HttpClient) { }

  getPostData(id){
    var obj = {'id':id}
    return this._http.post("http://localhost:3000/getPostData",obj);
  }

  updatePostByUser(data){
    return this._http.post("http://localhost:3000/updatePostData",data);
  }
}
