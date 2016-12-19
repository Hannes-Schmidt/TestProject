public with sharing class ContactListController {
   @AuraEnabled
    public static List<Contact> getContacts (String filter)
    {
        List<Contact> contactList;
        if(filter == null)
        {
            filter = '';
        }
        
        String filterString = '%' + filter + '%';
        contactList = [SELECT Id, Name, Email, FirstName, LastName, Phone, Account.Name FROM Contact WHERE name LIKE :filterString];
        
        return contactList;
    } 
}