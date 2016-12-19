({
	buttonPressed : function(component, event, helper) {
        var userNameFromComp = component.get("v.username");
		//helper.showAlert(userNameFromComp);
		var myEvent = component.getEvent("userButtonClicked");
        myEvent.setParams({username: userNameFromComp});
        myEvent.fire();
	}
    
})