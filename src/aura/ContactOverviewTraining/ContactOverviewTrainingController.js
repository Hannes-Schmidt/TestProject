({
    doInit :  function(component, event, helper) {
        helper.getContactList(component);
    },
    
    onFilterChange : function(component, event, helper) {
		helper.getContactList(component);
	},
    
    onContactClick : function(component, event, helper) {
        helper.getContact(component, event);
    }
})