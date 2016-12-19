public class WeisswurstShoppingListController{
    @AuraEnabled
    public static Weisswurst_Event__c getWeisswurstEvent(){
        return [SELECT Id, Name, Weisswurst_gekauft__c FROM Weisswurst_Event__c LIMIT 1][0];
    }
}