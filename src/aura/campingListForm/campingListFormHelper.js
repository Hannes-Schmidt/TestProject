({
    createItem: function(component, newItem) {
        var createEvent = component.getEvent("addItem");
        createEvent.setParams({ "campingItem": newItem });
        createEvent.fire();
        component.set("v.newItem",{ 'sobjectType': 'Camping_Item__c',
                    'Name': '',
                    'Quantity__c': 0,
                    'Price__c': 0,
                    'Packed__c': false })
    },


	validatecampingListForm: function(component) {

        // Simplistic error checking
        var validCampingItem = true;

        // Name must not be blank
        var nameField = component.find("itemname");
        var itemname = nameField.get("v.value");
        if ($A.util.isEmpty(itemname)){
            validCampingItem = false;
            nameField.set("v.errors", [{message:"Item name can't be blank."}]);
        }
        else {
            nameField.set("v.errors", null);
        }

        // Quantity must be set, must be a positive number
        var quantityField = component.find("itemquantity");
        var itemquantity = quantityField.get("v.value");
        if ($A.util.isEmpty(itemquantity) || isNaN(itemquantity) || (itemquantity <= 0.0)){
            validCampingItem = false;
            quantityField.set("v.errors", [{message:"Enter an item quantity."}]);
        }
        else {
            // If the amount looks good, unset any errors...
            quantityField.set("v.errors", null);
        }

        // Price must be set, must be a positive number
        var priceField = component.find("itemprice");
        var itemprice = priceField.get("v.value");
        if ($A.util.isEmpty(itemprice) || isNaN(itemprice) || (itemprice <= 0.0)){
            validCampingItem = false;
            priceField.set("v.errors", [{message:"Enter an item price."}]);
        }
        else {
            // If the amount looks good, unset any errors...
            priceField.set("v.errors", null);
        }
    
        return(validCampingItem);
    }
})