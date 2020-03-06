import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { AlertifyService } from 'src/services/alertify.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router: Router, 
    private alertify: AlertifyService){}

  canActivate(): boolean {
    if(this.authService.isLoggedIn()){
      return true;
    }
    this.alertify.error('Unauthenticated');
    this.router.navigate(['/home']);
    return false;
  }
  
}
