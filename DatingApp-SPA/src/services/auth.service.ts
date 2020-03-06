import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';  
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

jwtHelper = new JwtHelperService();
baseUrl = environment.apiUrl + 'Auth/';
decodedToken: any;

constructor(private http: HttpClient) { }

login(model: any){
  return this.http.post(this.baseUrl + 'Login', model)
  .pipe(
    map((res: any) => {
      const user = res;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
      }
    })
  )
}

isLoggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

register(model: any){
  return this.http.post(this.baseUrl+ "register", model)
}
}
