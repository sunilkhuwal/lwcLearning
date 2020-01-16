import { LightningElement, api } from 'lwc';

export default class MemberSkills extends LightningElement {
	handleOpenRecordClick() {
		const selectEvent = new CustomEvent('bearview', {
			detail: this.bear.Id
		});
		this.dispatchEvent(selectEvent);
	}
}