({
	handleToggleButtonClicked : function(component, event, helper) {
	    var toggleButtonClickedEvent = component.getEvent("toggleButtonClicked");
	    helper.getToggleButtonValue(component, toggleButtonClickedEvent);
	    toggleButtonClickedEvent.fire();
	}
})