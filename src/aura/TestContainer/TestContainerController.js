({
	doInit : function(component, event, helper) {
		var action = component.get("c.getExpense");
		
		action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS"){
               
                component.set("v.expenses", response.getReturnValue());
                console.log(component.get("v.expenses"));
            }
            else {
                console.log( "Failed with state: " + state);
            }
        });
	}
})