public with sharing class TestContainerController {
    
    @AuraEnabled
    public static List<Expense__c> getExpense(){
        List<Expense__c> expenses = [SELECT Id, Name, Amount__c, Date__c, Reimbursed__c FROM Expense__c];
        return expenses;
    }
}