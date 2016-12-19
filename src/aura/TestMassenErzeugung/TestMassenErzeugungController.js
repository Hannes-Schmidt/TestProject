({
    doInit : function(component, event, helper) {
        helper.loadOptions(component);
    },
    
    onTemplateSelectChange : function(component, event, helper) {
        
    },
    
     onPublicationCycleSelectChange : function(component, event, helper) {
         helper.changePublicationCycle(component);
    },
    
     onCancelButtonClicked : function(component, event, helper) {
        helper.validateForm(component);
    },
    
     onDuplicateIssueButtonClicked : function(component, event, helper) {
        helper.sendTemplate(component);
    }
})