import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UsersService } from 'src/services/users.service';
import { AlertifyService } from 'src/services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  users: User[];

  constructor(private userService: UsersService,
    private route: ActivatedRoute,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(res =>{
      this.users = res['users'];
    });
  }

  loadUsers(){
    this.userService.getUsers().subscribe((users: User[]) =>{
      this.users = users;
    }, err =>{
      this.alertify.error(err);
    }
    )
  }
}
