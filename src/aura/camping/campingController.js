({
	doInit: function(component, event, helper) {

        // Create the action
        var action = component.get("c.getItems");

        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.items", response.getReturnValue());
         }
            else {
                console.log("Failed with state: " + state);
            }
        });

        // Send action off to be executed
        $A.enqueueAction(action);
    },

    clickCreateCampingListItem: function(component, event, helper) {
        if(helper.validateCampingListForm(component)){
            // Create the new expense
            var newCampingItem = component.get("v.newItem");
            helper.createCampingItem(component, newCampingItem);
        }
    },

})