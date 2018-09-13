import { Component, OnInit, Input } from '@angular/core';
import {CommentsService} from '../comments.service';
import {FormsModule} from '@angular/forms'
import { Comment } from '@angular/compiler';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: any = [];
  comment: any = {};
  @Input() commentid: any;
  status = false;

  constructor(private cmtservice: CommentsService) { }

  ngOnInit() {

    this.cmtservice.getCommentsByPid(this.commentid).subscribe((resp:any)=>{
      if(resp.success){
        this.comments = resp.data;
      }
      else{
        alert('No Comments Found.')
      }
    });
   
  }
  showComments(id){
    this.status = !this.status;
    
  }
  saveComment(){
    this.comment.postId = this.commentid;
    // console.log(typeof(this.comment))
    // console.log(JSON.stringify(this.comment))
    this.cmtservice.saveCommentByuser(this.comment).subscribe((resp:any)=>{
      if(resp.success){
        this.comment={};
        this.ngOnInit();
        
      }
    });
  }
  deleteComment(id){
    this.cmtservice.deleteCommentById(id).subscribe((resp:any)=>{
      if(resp.delete){
        this.ngOnInit();
      }
    })
  }

}
