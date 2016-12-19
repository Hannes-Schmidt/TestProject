({
	getWWEvent : function(component) {
		var action = component.get("c.getWeisswurstEvent");
        
        action.setCallback(this, function(response) {
           component.set("v.WWEvent", response.getReturnValue());
        });
        
        $A.enqueueAction(action);
	}
})