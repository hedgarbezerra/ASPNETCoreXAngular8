import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	jwtHelper = new JwtHelperService();
	title = 'DatingApp';

	constructor(private authService: AuthService) {}

	ngOnInit() {
		const token = localStorage.getItem('token');
		this.authService.decodedToken = this.jwtHelper.decodeToken(token);
	}
}
