import { LightningElement, wire,track} from 'lwc';
import getAllTeamMembers from '@salesforce/apex/TeamMemberController.getAllTeamMembers'
import getAllTeams from '@salesforce/apex/TeamMemberController.getAllTeams'
export default class TeamList extends LightningElement {
	
	items = []; //this will hold key, value pair
	@track choosenValue = '';
	//@track myteam;
	@wire(getAllTeamMembers) members
	//@track members = [];
	@wire(getAllTeams) teams({error, data}){
		if(data){
			this.choosenValue = data[0].Name;
			for(let i=0; i<data.length; i++){
				this.items = [...this.items, {value : data[i].id, label: data[i].Name}];
			}
			
			this.error = undefined;
		}
		else if(error){
			this.error = error;
			this.data = undefined;
		}
	}

	//Getting team members
	@wire(getAllTeamMembers) myTeam(error, data){
		if(data){
			for(let i=0; i< data.length; i++)
			{
				if(this.choosenValue === data[i].Name){
					
					this.members = [...this.members, data[i]];
				}
			}
		}
		else if(error){
			this.error = error;
		}
	}

	//Getting all Teams
	

	get teamOptions(){
		return this.items;
	}

	//handleTeamChange
}