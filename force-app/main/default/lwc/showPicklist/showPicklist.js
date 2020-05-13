import { LightningElement, track } from 'lwc';

export default class ShowPicklist extends LightningElement {
	@track selectOptions = [];

	connectedCallback() {
		fetch('https://staging.cloud-elements.com/elements/api-v2/incident-types', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Secret Token"
			}
		}).then(function (response) {
			return response.json();
		}).then((myJson) => {
			var issueTypeData = JSON.parse(JSON.stringify(myJson));

			for (var i = 0; i < issueTypeData.length; i++) {
				const option = {
					label : issueTypeData[i].name,
					value : issueTypeData[i].name
				};
				this.selectOptions = [...this.selectOptions, option];
				//issueTypeList.push("{'label' : '" + issueTypeData[i].name + "'," + "'value' : '" + issueTypeData[i].name + "'},");
				console.log(issueTypeData[i].name);
			}
		})
			.catch(e => console.log(e));
	};
}