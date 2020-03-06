import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { User } from 'src/models/user';
import { UsersService } from 'src/services/users.service';
import { AlertifyService } from 'src/services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()

export class MemberListResolver implements Resolve<User[]>{
    constructor(private userService: UsersService,
         private router: Router,
         private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot) : Observable<User[]>{
        return this.userService.getUsers().pipe(
        catchError(err =>{
            this.alertify.error('Problem retrieving data');
            return of(null);
        })
        )
    };
    
}