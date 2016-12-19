({
	handleInputTextChanged : function(component, event, helper) {
		var inputTextChangedEvent = component.getEvent("inputTextChanged");
		helper.getInputTextValue(component, inputTextChangedEvent);
		inputTextChangedEvent.fire();
	}
})