public class NewCaseListController {
    public List<Case> getNewCases(){
        String searchCriteria = 'New';
        List<Case> newCasesList = Database.query('SELECT Id, CaseNumber FROM Case WHERE Status = :searchCriteria');
        return newCasesList;
    }

}