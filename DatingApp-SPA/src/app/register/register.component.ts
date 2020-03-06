import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { AlertifyService } from 'src/services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter();

  user: any ={};

  constructor(private authService : AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  register(){
    this.authService.register(this.user).subscribe(res =>{
     this.alertify.success('Registered successfuly');
    },
    err =>{
      console.log(err);
      this.alertify.error(err);
    })

  }
  cancel(){
    this.cancelEvent.emit(false);
  }
}
