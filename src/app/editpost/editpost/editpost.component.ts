import { Component, OnInit ,Input,EventEmitter, Output} from '@angular/core';
import {EditpostService} from '../editpost.service';
import {PostsComponent} from '../../posts/posts/posts.component'

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  showEdit = false;
  editPost : any = [];
  showEditPostData : any = {};


  constructor(private _editPostService : EditpostService,private _postcmp: PostsComponent) { }
  @Input() editPostId: any;
  @Output() refreshPost = new EventEmitter();

  visibleEdit : boolean = false;
  ngOnInit() {
    //alert(JSON.stringify(this.editPostId))
    this.visibleEdit = this.editPostId.isVisible;
    this._editPostService.getPostData(this.editPostId._id).subscribe((resp:any)=>{
      if(resp.success){
        //alert(JSON.stringify(resp.data))
        resp.data.editPost = this._postcmp.posts;
        this.editPost = resp.data;
      }
      else{
        alert('Something Went Wrong.')
      }
      
    })
  }
  showEditPost(){
    this.showEdit = !this.showEdit;
  }
  saveEditPost(){
    //alert(JSON.stringify(this.editPost))
    this._editPostService.updatePostByUser(this.editPost).subscribe((resp:any)=>{
      //alert(resp.success)
        if(resp.success){
          this.showEditPost();
          //this.ngOnInit();
          this.refreshPost.emit();
        }
        else{
          alert('Something went wrong.')
        }
        
    })
  }
  
  
}
