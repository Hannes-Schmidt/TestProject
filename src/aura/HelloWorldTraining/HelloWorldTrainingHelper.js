({
	calculateNameLength : function(component) {
		var lengthFirstName = component.get("v.firstName").length;
        var lengthLastName = component.get("v.lastName").length;
        
        component.set("v.nameLength", lengthFirstName + lengthLastName);
	}
})