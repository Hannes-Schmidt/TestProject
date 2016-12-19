({
	getContactList : function(component) {
		var filter = component.get("v.filter");
        var action = component.get("c.getContacts");
        
        action.setParams({
            "filter": filter
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if(component.isValid() && state === "SUCCESS") {
                var contactList = response.getReturnValue();
                component.set("v.contacts", contactList);
                component.set("v.clickedContact", contactList[0]);
            } else if (component.isValid() && state === "ERROR") {
                var errors = response.getError();
                if(errors) {
                    console.log("Error!");
                }
            }
        });
        
        $A.enqueueAction(action);
	},
    
    getContact : function (component, event) {
        var contactIndex = event.currentTarget.getAttribute("data-contact-index");
        var contact = component.get("v.contacts")[contactIndex];
        component.set("v.clickedContact", contact);
    }
})