import {Component, OnInit, ViewChild, HostListener} from '@angular/core';
import {User} from 'src/models/user';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from 'src/services/alertify.service';
import {NgForm} from '@angular/forms';
import {UsersService} from 'src/services/users.service';
import {AuthService} from 'src/services/auth.service';

@Component({
	selector: 'app-members-edit',
	templateUrl: './members-edit.component.html',
	styleUrls: ['./members-edit.component.css']
})
export class MembersEditComponent implements OnInit {
	@ViewChild('editForm', {static: true}) editForm: NgForm;
	@HostListener('window:beforeunload', ['$event'])
	unloadNotification($event: any) {
		if (this.editForm.dirty) {
			$event.returnValue = true;
		}
	}
	user: User;

	constructor(
		private route: ActivatedRoute,
		private alertify: AlertifyService,
		private userService: UsersService,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.route.data.subscribe(res => {
			this.user = res['user'];
		});
	}

	updateUser() {
		this.userService
			.updateUser(this.authService.decodedToken.nameid, this.user)
			.subscribe(
				res => {
					this.alertify.success('Profile updated');
					this.editForm.reset(this.user);
				},
				err => {
					this.alertify.error(err);
				}
			);
	}
}
