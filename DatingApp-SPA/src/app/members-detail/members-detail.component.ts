import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { UsersService } from 'src/services/users.service';
import { AlertifyService } from 'src/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/models/photo';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.css']
})
export class MembersDetailComponent implements OnInit {
  photos: Photo[];
  user: User;

  constructor(private userService: UsersService,
     private alertify: AlertifyService,
     private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(res =>{
      this.user = res['user'];
    });

    this.photos = this.getImages();
  }

  getImages(){
    const imageUrls = [];
    for (let  photo of this.user.photos) {
      imageUrls.push(photo);      
    }
    return imageUrls;
  }
  // loadUser(){
  //   this.userService.getUser(+this.route.snapshot.params['id'])
  //   .subscribe((user: User) =>{
  //     this.user = user;
  //   },
  //   err =>{
  //     this.alertify.error(err);
  //   });
  // }
}
