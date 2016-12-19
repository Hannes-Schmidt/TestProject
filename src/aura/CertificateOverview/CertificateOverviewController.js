({
    doInit : function(component, event, helper) {
        helper.getData(component);
    },
    
    onportfolioSelectChange : function(component, event, helper) {
      helper.setPortfolio(component);  
    },
    
    testButtonClicked : function(component, event, helper) {
        var portfolio = component.get("v.portfolio");
        var portfolioSelectValue = component.find("portfolioSelect").get("v.value");
        debugger;
    }
})