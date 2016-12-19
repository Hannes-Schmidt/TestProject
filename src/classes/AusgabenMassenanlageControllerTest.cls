@isTest
public class AusgabenMassenanlageControllerTest {
    
    
    @isTest static void testGetTemplates() {
        List<Ausgabe__c> testIssues = new List<Ausgabe__c>();
        Ausgabe__c testIssue1 = new Ausgabe__c(Name = 'Test1-2016-01', Publikation__c = 'Test1', Template__c = true);
        Ausgabe__c testIssue2 = new Ausgabe__c(Name = 'Test2-2016-01', Publikation__c = 'Test2', Template__c = false);
        Ausgabe__c testIssue3 = new Ausgabe__c(Name = 'Test3-2016-01', Publikation__c = 'Test3', Template__c = true);
        testIssues.add(testIssue1);
        testIssues.add(testIssue2);
        testIssues.add(testIssue3);
      
        Test.startTest();
        insert testIssues;
        List<Ausgabe__c> templates = AusgabenMassenanlageController.getTemplates();
        Test.stopTest();
        for(Integer i = 0; i < templates.size(); i++) {
            System.assert(templates[i].Template__c);
        }
        System.assertEquals(2, templates.size());
    }
    
    @isTest static void testDuplicateTemplateDaily() {
        Ausgabe__c testIssue1 = new Ausgabe__c(Name = 'Test1-2016-01', Publikation__c = 'Test1', Template__c = true);
        Boolean[] dailyTueThu = new List<Boolean>{false, true, false, true, false, false, false};
        
        Test.startTest();
        insert testIssue1;
        List<Ausgabe__c> duplicatedIssues = AusgabenMassenanlageController.duplicateTemplate(testIssue1.Id, 9, 'daily', dailyTueThu, 3, '2016-12-28', 3, 3);
        Test.stopTest();
        System.assertEquals(Date.valueOf('2016-12-29'), duplicatedIssues[0].Erscheinungsdatum__c);
        System.assertEquals(Date.valueOf('2017-01-03'), duplicatedIssues[1].Erscheinungsdatum__c);
        System.assertEquals(Date.valueOf('2017-01-05'), duplicatedIssues[2].Erscheinungsdatum__c);
        System.assertEquals('09', duplicatedIssues[0].Ausgabe_Nr__c);
        System.assertEquals('01', duplicatedIssues[1].Ausgabe_Nr__c);
        System.assertEquals('02', duplicatedIssues[2].Ausgabe_Nr__c);
        System.assertEquals('2016', duplicatedIssues[0].Ausgabe_Jahr__c);
        System.assertEquals('2017', duplicatedIssues[1].Ausgabe_Jahr__c);
        System.assertEquals('2017', duplicatedIssues[2].Ausgabe_Jahr__c);
        System.assertEquals('Test1-2016-09', duplicatedIssues[0].Name);
        System.assertEquals('Test1-2017-01', duplicatedIssues[1].Name);
        System.assertEquals('Test1-2017-02', duplicatedIssues[2].Name);
    }
    
    @isTest static void testDuplicateTemplateWeekly() {
        Ausgabe__c testIssue1 = new Ausgabe__c(Name = 'Test1-2016-01', Publikation__c = 'Test1', Template__c = true);
        Boolean[] weeklyThu = new List<Boolean>{false, false, false, true, false, false, false};
        
        Test.startTest();
        insert testIssue1;
        List<Ausgabe__c> duplicatedIssues = AusgabenMassenanlageController.duplicateTemplate(testIssue1.Id, 9, 'weekly', weeklyThu, 3, '2016-12-28', 3, 3);
        Test.stopTest();
        System.assertEquals(Date.valueOf('2016-12-29'), duplicatedIssues[0].Erscheinungsdatum__c);
        System.assertEquals(Date.valueOf('2017-01-05'), duplicatedIssues[1].Erscheinungsdatum__c);
        System.assertEquals(Date.valueOf('2017-01-12'), duplicatedIssues[2].Erscheinungsdatum__c);
        System.assertEquals('09', duplicatedIssues[0].Ausgabe_Nr__c);
        System.assertEquals('01', duplicatedIssues[1].Ausgabe_Nr__c);
        System.assertEquals('02', duplicatedIssues[2].Ausgabe_Nr__c);
        System.assertEquals('2016', duplicatedIssues[0].Ausgabe_Jahr__c);
        System.assertEquals('2017', duplicatedIssues[1].Ausgabe_Jahr__c);
        System.assertEquals('2017', duplicatedIssues[2].Ausgabe_Jahr__c);
        System.assertEquals('Test1-2016-09', duplicatedIssues[0].Name);
        System.assertEquals('Test1-2017-01', duplicatedIssues[1].Name);
        System.assertEquals('Test1-2017-02', duplicatedIssues[2].Name);
    }
    
    @isTest static void testDuplicateTemplateMonthly() {
        Ausgabe__c testIssue1 = new Ausgabe__c(Name = 'Test1-2016-01', Publikation__c = 'Test1', Template__c = true);
        Boolean[] monthlyFri = new List<Boolean>{false, false, false, false, true, false, false};
        
        Test.startTest();
        insert testIssue1;
        List<Ausgabe__c> duplicatedIssues = AusgabenMassenanlageController.duplicateTemplate(testIssue1.Id, 9, 'monthly', monthlyFri, 3, '2016-11-24', 3, 3);
        Test.stopTest();
        System.assertEquals(Date.valueOf('2016-11-25'), duplicatedIssues[0].Erscheinungsdatum__c);
        System.assertEquals(Date.valueOf('2016-12-23'), duplicatedIssues[1].Erscheinungsdatum__c);
        System.assertEquals(Date.valueOf('2017-01-27'), duplicatedIssues[2].Erscheinungsdatum__c);
        System.assertEquals('09', duplicatedIssues[0].Ausgabe_Nr__c);
        System.assertEquals('10', duplicatedIssues[1].Ausgabe_Nr__c);
        System.assertEquals('01', duplicatedIssues[2].Ausgabe_Nr__c);
        System.assertEquals('2016', duplicatedIssues[0].Ausgabe_Jahr__c);
        System.assertEquals('2016', duplicatedIssues[1].Ausgabe_Jahr__c);
        System.assertEquals('2017', duplicatedIssues[2].Ausgabe_Jahr__c);
        System.assertEquals('Test1-2016-09', duplicatedIssues[0].Name);
        System.assertEquals('Test1-2016-10', duplicatedIssues[1].Name);
        System.assertEquals('Test1-2017-01', duplicatedIssues[2].Name);
    }
}