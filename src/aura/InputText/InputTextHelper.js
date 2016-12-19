({
	getInputTextValue : function(component, event) {
		event.setParam("inputText",(component.find("inputText").get("v.value")));
	}
})