({
	getToggleButtonValue : function(component, event) {
	    var toggleButtonValue =  component.find("toggleButton").getElement().checked;
	    event.setParam("toggleButtonSelected", toggleButtonValue);
	}
})