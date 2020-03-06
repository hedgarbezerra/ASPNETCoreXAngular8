import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { AlertifyService } from 'src/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user : any = {};
  constructor(public   authService : AuthService, private alertify : AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.user).subscribe(res => {
      this.alertify.success('Logged in successfully');
      this.router.navigate(['/members']);
    },
    err =>{
      this.alertify.error(err);
    })
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  
  logout(){
    localStorage.removeItem('token');
    this.alertify.message(`You've been successfuly logged out`);
    this.router.navigate(['/home']);
  }
}
