public with sharing class TeamMemberController
{
    @AuraEnabled(Cacheable=true)
    public static List<TeamMember__c> getAllTeamMembers(){
        return [SELECT ID, Name, Skills__c, Team__r.Name FROM TeamMember__c LIMIT 50];
    }
    
    @AuraEnabled(Cacheable=true)
    public static List<Team__c> getAllTeams(){
        return [SELECT ID, Name FROM Team__c LIMIT 50];
    }
}