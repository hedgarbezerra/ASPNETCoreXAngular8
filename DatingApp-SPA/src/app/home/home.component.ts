import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(public authService: AuthService, private httpClient:HttpClient) { }

  ngOnInit() {
  }
  
  registerToggle(){
    this.registerMode = !this.registerMode;
  }
  
  cancelRegisterMode(newMode:boolean){
    this.registerMode = newMode;
  }
}
