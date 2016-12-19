@isTest
private class ParkLocatorTest {
    @isTest static void testCountry() {              
        // This causes a fake response to be generated
        Test.setMock(WebServiceMock.class, new ParkServiceMock());
        // Call the method that invokes a callout
  
        
        String country = 'Germany';
    

        System.assertEquals(new List<String>{'Hamburg Wadden Sea National Park', 'Hainich National Park', 'Bavarian Forest National Park'},     ParkLocator.country(country)); 
    }
}