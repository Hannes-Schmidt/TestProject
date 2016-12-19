public class ContactAndLeadSearch {
    public static List<List<SObject>> searchContactsAndLeads(String name){
        List<List<SObject>> testList = [FIND :name IN NAME FIELDS RETURNING Contact(LastName,FirstName), Lead(LastName,FirstName)];
        return testList; 
    }
}