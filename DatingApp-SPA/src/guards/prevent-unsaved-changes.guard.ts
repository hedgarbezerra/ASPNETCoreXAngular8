import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {MembersEditComponent} from 'src/app/members-edit/members-edit.component';

@Injectable()
export class PreventUnsavedChanges
	implements CanDeactivate<MembersEditComponent> {
	canDeactivate(component: MembersEditComponent) {
		if (component.editForm.dirty) {
			return confirm(
				'Are you sure you want to leave? Any unsaved changes will be lost'
			);
		}
		return true;
	}
}
