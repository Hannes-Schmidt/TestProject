({
	handleToggleButtonClicked : function(component, event, helper) {
		var toggleButtonValue = event.getParam("toggleButtonSelected");
		component.set("v.toggleButtonSelected", toggleButtonValue);
	},
	
	handleInputTextChanged : function(component, event, helper) {
	    var inputText = event.getParam("inputText");
	    component.set("v.inputText", inputText);
	},
	
	handleButtonPressed : function(component, event, helper) {
	    if(component.get("v.toggleButtonSelected")==true){
	        component.find("textArea").set("v.value", component.get("v.inputText"));
	    }else{
	        component.find("textArea").set("v.value", "");
	    }
	}
})