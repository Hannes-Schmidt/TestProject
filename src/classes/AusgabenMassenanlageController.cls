public with sharing class AusgabenMassenanlageController {
    
    @AuraEnabled
    public static List<Ausgabe__c> getTemplates() {
        
        List<Ausgabe__c> templates = [SELECT Template__c, Publikation__c, Name, Id, Erscheinungsdatum__c, Druckunterlagenschluss__c, Ausgabe_Nr__c, 
        Ausgabe_Name__c, Ausgabe_Jahr__c, Anzeigenschluss__c FROM Ausgabe__c WHERE Template__c = true];
        return templates;
    }
    
    @AuraEnabled
    public static List<Ausgabe__c> duplicateTemplate(Id templateId, Integer issueNumber, String publicationCycle, Boolean[] weekdays, Integer numberOfIssues,
     String startDateString, Integer daysBeforeClosingDate, Integer daysBeforeSubmissionDeadline) {
        
        Ausgabe__c template = [SELECT Id, Publikation__c, Name FROM Ausgabe__c WHERE Id = :templateId];
        Map<String, Boolean> selectedWeekdays = getSelectedWeekdays(weekdays);
        Date startDate = getNextPublicationDate(Date.valueOf(startDateString), selectedWeekdays);
        String currentPublicationYear = '' + startDate.year();
        Integer weekOfMonth = startDate.toStartOfMonth().daysBetween(startDate)/7;

        List<Ausgabe__c> newIssues = new List<Ausgabe__c>();
        
        for(Integer i = 0; i<numberOfIssues; i++) {
            
            Date publicationDate = startDate;
            
            if(publicationCycle == 'daily') {
                publicationDate = getNextPublicationDate(startDate, selectedWeekdays);
                startDate = publicationDate.addDays(1);
            }
            
            if(publicationCycle == 'weekly') {
                publicationDate = getNextPublicationDate(startDate, selectedWeekdays);
                startDate = publicationDate.addDays(7);
            }
            
            if(publicationCycle == 'monthly') {
                
                startDate = startDate.toStartOfMonth();
                publicationDate = getNextPublicationDate(startDate, selectedWeekdays);
                publicationDate = publicationDate + (weekOfMonth*7);
                startDate = publicationDate.addMonths(1);
            }
            
            String publicationYear = '' + publicationDate.year();
            
            String newIssueNumberString = '';
            if(('' + publicationDate.year()) == currentPublicationYear) {
                if(issueNumber < 10) {
                    newIssueNumberString = '0' + issueNumber;
                } else {
                    newIssueNumberString = '' + issueNumber;
                }
            } else {
                issueNumber = 1;
                currentPublicationYear = '' + publicationDate.year();
                newIssueNumberString = '0' + issueNumber;
            }
            
            issueNumber = issueNumber + 1;
               
            Ausgabe__c newIssue = new Ausgabe__c();
            newIssue.Ausgabe_Nr__c = newIssueNumberString;
            newIssue.Erscheinungsdatum__c = publicationDate;
            newIssue.Ausgabe_Jahr__c = publicationYear;
            newIssue.Anzeigenschluss__c = publicationDate - daysBeforeClosingDate;
            newIssue.Druckunterlagenschluss__c = publicationDate - daysBeforeSubmissionDeadline;
            newIssue.Name = template.Publikation__c + '-' + publicationYear + '-' + newIssueNumberString;
            newIssue.Publikation__c = template.Publikation__c;
            newIssues.add(newIssue);
            
        }
        
        insert newIssues;
        return newIssues;
    }
    
    public static Date getNextPublicationDate(Date startDate, Map<String, Boolean> weekdays) {
        Datetime startDateTime = datetime.newInstance(startDate.year(), startDate.month(), startDate.day());
        String day = startDateTime.format('EEE');
        if(weekdays.get(day)) {
            return startDate;
        } else {
            startDate = startDate.addDays(1);
            return getNextPublicationDate(startDate, weekdays);
        }
    }
    
    public static Map<String, Boolean> getSelectedWeekdays(Boolean[] weekdays) {
        Map<String, Boolean> selectedWeekdays = new Map<String, Boolean>();
        
        selectedWeekdays.put('Mon', weekdays[0]);
        selectedWeekdays.put('Tue', weekdays[1]);
        selectedWeekdays.put('Wed', weekdays[2]);
        selectedWeekdays.put('Thu', weekdays[3]);
        selectedWeekdays.put('Fri', weekdays[4]);
        selectedWeekdays.put('Sat', weekdays[5]);
        selectedWeekdays.put('Sun', weekdays[6]);
        
        return selectedWeekdays;
    }

}