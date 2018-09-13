import { Component, OnInit } from '@angular/core';
import { NewpostService} from '../newpost.service';


@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {

  newPost : any = {};

  constructor(private _newpostservice: NewpostService) { }

  ngOnInit() {
  }
  savePost(){
    this._newpostservice.addNewPost(this.newPost);
  }

}
