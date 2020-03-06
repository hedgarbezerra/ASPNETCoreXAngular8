import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['./members-edit.component.css']
})
export class MembersEditComponent implements OnInit {
  user:User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(res =>{
     this.user = res['user'];
    })
  }

}
