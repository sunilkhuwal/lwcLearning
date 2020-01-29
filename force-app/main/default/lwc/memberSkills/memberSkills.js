import { LightningElement, wire, track} from 'lwc';
import {
	createRecord
  } from "lightning/uiRecordApi";
  import TEAM_MEMBER_OBJECT from "@salesforce/schema/TeamMember__c";
  import TEAM_MEMBER_NAME_FIELD from "@salesforce/schema/TeamMember__c.Name";
  import TEAM_MEMBER_SKILL_FIELD from "@salesforce/schema/TeamMember__c.Skills__c";
  import TEAM_MEMBER_TEAM_FIELD from "@salesforce/schema/TeamMember__c.Team__c";
  import getAllTeams from '@salesforce/apex/TeamMemberController.getAllTeams';

export default class MemberSkills extends LightningElement {
	memberName = '';
	memberTeam = '';
	memberSkills = '';
	@track items = [];
	
	handleNameChange(event){
		this.memberName = event.target.value;
	}

	handleSkillsChange(event){
		this.memberSkills = event.target.value;
		console.log(this.memberSkills);
	}

	handleTeamChange(event){
		this.memberTeam = event.target.value;
		console.log(this.memberTeam);
	}

	handleSaveRecord(){
		this.createMemberRecord();
	}

	createMemberRecord(){
		const fields = {};
		fields[TEAM_MEMBER_NAME_FIELD.fieldApiName] = this.memberName;
		fields[TEAM_MEMBER_SKILL_FIELD.fieldApiName] = this.memberSkills;
		fields[TEAM_MEMBER_TEAM_FIELD.fieldApiName] = this.memberTeam;
		const recordInput = { apiName: TEAM_MEMBER_OBJECT.objectApiName, fields };
		createRecord(recordInput)
		.then(TeamMember => {
			this.memberName = this.memberTeam = this.memberSkills = "";
			this.dispatchEvent(new CustomEvent("teamcomboevent"));
		});
	}

	@wire(getAllTeams) teams({error, data}){
		console.log('aaaa'+ data);
		if(data){
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

	get teamOptions(){
		return this.items;
	}
}