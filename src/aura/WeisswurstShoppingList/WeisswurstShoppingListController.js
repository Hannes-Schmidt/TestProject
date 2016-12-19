({
	myAction : function(component, event, helper) {
		alert(event.getSource().get("v.value") +" "+ event.getSource().get("v.label"));
        
	},
    
    onInit : function(component, event, helper) {
        helper.getWWEvent(component);
    }
})