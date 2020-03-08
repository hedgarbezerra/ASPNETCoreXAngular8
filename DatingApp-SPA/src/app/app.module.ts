import {
	BrowserModule,
	HammerGestureConfig,
	HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ErrorInterceptorProvider} from 'src/services/error.interceptor';
import {ListComponent} from './list/list.component';
import {MessagesComponent} from './messages/messages.component';
import {NgxGalleryModule} from 'ngx-gallery';
import {MembersListComponent} from './members-list/members-list.component';
import {MembersCardComponent} from './members-card/members-card.component';
import {JwtModule} from '@auth0/angular-jwt';
import {MembersDetailComponent} from './members-detail/members-detail.component';
import {registerLocaleData} from '@angular/common';
import br from '@angular/common/locales/br';
import {MemberDetailResolver} from 'src/resolvers/members-detail-resolver';
import {MemberListResolver} from 'src/resolvers/members-list-resolver';
import {MembersEditComponent} from './members-edit/members-edit.component';
import {MemberEditResolver} from 'src/resolvers/members-edit-resolver';
import {AppRoutingModule} from './app-routing.module';
import {PreventUnsavedChanges} from 'src/guards/prevent-unsaved-changes.guard';
import {AuthGuard} from 'src/guards/auth.guard';

export function tokenGetter() {
	return localStorage.getItem('token');
}
export class CustomHammerConfig extends HammerGestureConfig {
	overrides = {
		pinch: {enable: false},
		rotate: {enable: false}
	};
}

registerLocaleData(br, 'pt');

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		HomeComponent,
		RegisterComponent,
		ListComponent,
		MessagesComponent,
		MembersListComponent,
		MembersCardComponent,
		MembersDetailComponent,
		MembersEditComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		NgxGalleryModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: ['localhost:5000'],
				blacklistedRoutes: ['localhost:5000/api/auth']
			}
		})
	],
	providers: [
		ErrorInterceptorProvider,
		MemberDetailResolver,
		MemberListResolver,
		MemberEditResolver,
		PreventUnsavedChanges,
		AuthGuard,
		{provide: LOCALE_ID, useValue: 'pt'},
		{provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
