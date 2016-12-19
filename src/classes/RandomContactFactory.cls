public class RandomContactFactory {
    public static List<Contact> generateRandomContacts(Integer numCons, String lastNameCons){
        List<Contact> consList = new List<Contact>();
        
        for(Integer i=0;i<numCons;i++){
            Contact c = new Contact(LastName = lastNameCons, FirstName = 'Test '+i);
            consList.add(c);
        }
        
        return consList;
    }
}