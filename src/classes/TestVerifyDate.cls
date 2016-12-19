@isTest
public class TestVerifyDate {
    
    @isTest static void testDate2Past(){
        Date date1 = Date.newInstance(2016, 9, 6);
        Date date1EndOfMonth = Date.newInstance(2016,9, 30);
        Date date2 = Date.newInstance(2016, 9, 5);
        Date testDate = VerifyDate.CheckDates(date1, date2);
        System.assertEquals(date1EndOfMonth, testDate);
    }
    
    @isTest static void testDate2Equal(){
        Date date1 = Date.newInstance(2016, 9, 6);
        Date date2 = Date.newInstance(2016, 9, 6);
        Date testDate = VerifyDate.CheckDates(date1, date2);
        System.assertEquals(date2, testDate);
	}
    
    @isTest static void testDate2Within(){
        Date date1 = Date.newInstance(2016, 9, 6);
        Date date2 = Date.newInstance(2016, 9, 12);
        Date testDate = VerifyDate.CheckDates(date1, date2);
        System.assertEquals(date2, testDate);
	}
    
    @isTest static void testDate2Not(){
        Date date1 = Date.newInstance(2016, 9, 6);
        Date date1EndOfMonth = Date.newInstance(2016,9, 30);
        Date date2 = Date.newInstance(2016, 11, 6);
        Date testDate = VerifyDate.CheckDates(date1, date2);
        System.assertEquals(date1EndOfMonth, testDate);
	}
}