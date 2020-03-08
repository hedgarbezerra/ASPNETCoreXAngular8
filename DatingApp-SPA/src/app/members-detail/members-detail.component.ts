import {Component, OnInit} from '@angular/core';
import {User} from 'src/models/user';
import {UsersService} from 'src/services/users.service';
import {AlertifyService} from 'src/services/alertify.service';
import {ActivatedRoute} from '@angular/router';
import {Photo} from 'src/models/photo';
import {
	NgxGalleryOptions,
	NgxGalleryImage,
	NgxGalleryAnimation
} from 'ngx-gallery';

@Component({
	selector: 'app-members-detail',
	templateUrl: './members-detail.component.html',
	styleUrls: ['./members-detail.component.css']
})
export class MembersDetailComponent implements OnInit {
	galleryOptions: NgxGalleryOptions[];
	galleryImages: NgxGalleryImage[];
	user: User;

	constructor(
		private userService: UsersService,
		private alertify: AlertifyService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.route.data.subscribe(res => {
			this.user = res['user'];
		});

		this.galleryOptions = [
			{
				width: '500px',
				height: '500px',
				imagePercent: 100,
				thumbnailsColumns: 4,
				imageAnimation: NgxGalleryAnimation.Slide,
				preview: false
			}
		];

		this.galleryImages = this.getImages();
	}

	getImages() {
		const imageUrls = [];

		for (let photo of this.user.photos) {
			imageUrls.push({
				small: photo.url,
				medium: photo.url,
				big: photo.url,
				description: photo.description
			});
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
