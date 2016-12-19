({
	submitForm : function(component, event, helper) {
		if(helper.validatecampingListForm(component)){
            var newItem = component.get("v.newItem");
            helper.createItem(component, newItem);
        }
	}
})