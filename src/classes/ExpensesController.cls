public with sharing class ExpensesController {

    @AuraEnabled
    public static List<Expense__c> getExpenses() {
        // Perform isAccessible() checking first, then
        return [SELECT Id, Name, Amount__c, Client__c, Date__c, 
                       Reimbursed__c, CreatedDate 
                FROM Expense__c];
    }
    
    @AuraEnabled
    public static Expense__c saveExpense(Expense__c expense) {
        // Perform isUpdatable() checking first, then
        if(Schema.SObjectType.Expense__c.isUpdateable()){
            upsert expense;    
        }
        return expense;
    }
    
    @AuraEnabled
    public static Expense__c getReimbursedStatus(String name){
            Expense__c[] expense = [SELECT Id, Name, Client__c, Date__c, 
                       Reimbursed__c, CreatedDate  FROM Expense__c WHERE Name=:name]; 
            return expense[0];
    }
    
    @AuraEnabled
    public static Expense__c updateReimbursedStatus(Expense__c expense){
            update expense;
            return expense;
    }
}