import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from 'src/guards/auth.guard';
import {MembersListComponent} from './members-list/members-list.component';
import {MemberListResolver} from 'src/resolvers/members-list-resolver';
import {MembersEditComponent} from './members-edit/members-edit.component';
import {MemberEditResolver} from 'src/resolvers/members-edit-resolver';
import {MembersDetailComponent} from './members-detail/members-detail.component';
import {MemberDetailResolver} from 'src/resolvers/members-detail-resolver';
import {MessagesComponent} from './messages/messages.component';
import {ListComponent} from './list/list.component';
import {PreventUnsavedChanges} from 'src/guards/prevent-unsaved-changes.guard';

const routes: Routes = [
	{path: '', component: HomeComponent},
	{
		path: '',
		runGuardsAndResolvers: 'always',
		canActivate: [AuthGuard],
		children: [
			{
				path: 'members',
				component: MembersListComponent,
				resolve: {users: MemberListResolver}
			},
			{
				path: 'members/edit',
				component: MembersEditComponent,
				resolve: {user: MemberEditResolver},
				canDeactivate: [PreventUnsavedChanges]
			},
			{
				path: 'members/:id',
				component: MembersDetailComponent,
				resolve: {user: MemberDetailResolver}
			},

			{path: 'messages', component: MessagesComponent},
			{path: 'list', component: ListComponent}
		]
	},
	{path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
