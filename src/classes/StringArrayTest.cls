public class StringArrayTest {
    public static String[] generateStringArray(Integer length){
        List<String> Test = new List<String>();
        for(Integer i=0; i<length; i++){
            Test.add('Test ' + i);
            System.debug('Test ' + i);
            }
        return Test;
    }

}