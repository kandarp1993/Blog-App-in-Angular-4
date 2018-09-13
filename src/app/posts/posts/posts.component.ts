import { Component, OnInit } from '@angular/core';
import {PostsserviceService} from '../postsservice.service'
import { post } from 'selenium-webdriver/http';
import {CommentsService} from '../../comments/comments.service'
import { Comment } from '@angular/compiler';
import {Router} from '@angular/router';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts : any = [];
  showLikebtn : any = [];
  shownames : any = [];
   
  constructor(private _pstservice:PostsserviceService, private _commentservice:CommentsService, private _router: Router) { }

  ngOnInit() {
     this._pstservice.getAllPosts().subscribe((res:any)=>{
       this.posts= res.data;
     });
  }
  deletePost(id){
    this._pstservice.deletePostById(id).subscribe((res:any)=>{
        if(res.delete){
          this.ngOnInit();
        }
        else{
          alert('Something went wrong.');
        }
    });
  }
  likePost(index){
    var id = this.posts[index]._id;
  
    this._pstservice.likePostById(id).subscribe((res:any)=>{
      if(res.success){
       this.ngOnInit();
        
      }
      else{
        alert('Something went wrong.');
      }
  });
  this.posts[index].count +=1; 
  }
  showNames(i){
    this.shownames[i] = !this.shownames[i];
  }
}
