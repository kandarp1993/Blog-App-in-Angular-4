import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _http: HttpClient) { }

  getCommentsByPid(id){
    var obj = {'id':id}
    return this._http.post("http://localhost:3000/getComments",obj);
  }
  saveCommentByuser(data){
    return this._http.post("http://localhost:3000/addComment",data);
  }
  deleteCommentById(id){
    var obj = {'id':id};
    return this._http.post("http://localhost:3000/deleteComment",obj);
  }
}
