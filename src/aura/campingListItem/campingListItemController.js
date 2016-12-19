({
	packItem : function(component, event, helper) {
		component.find("packedCheckbox").set("v.value", true);
        component.set("v.item.Packed__c", true);
        var campingListItem = component.get("v.item");
        component.set("v.item", campingListItem);
        event.getSource().set("v.disabled", true);
	}
})