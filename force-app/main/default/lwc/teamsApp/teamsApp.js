import { LightningElement, api, wire } from 'lwc';
import getAllTeams from '@salesforce/apex/TeamMemberController.getAllTeams';

export default class TeamsApp extends LightningElement {
	@api customTeamList;
	@api error;
	
	@wire(getAllTeams) wiredTeamsRecords({data, error}){
		if(data){
			this.customTeamList = JSON.stringify(data);
			this.error = undefined;
		}
		else if(error){
			this.error = error;
			this.customTeamList = undefined;
		}
	}
}