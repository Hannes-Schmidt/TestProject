({
    createCampingItem: function(component, item) {
        var action = component.get("c.saveItem");
        action.setParams({
         "campingItem": item
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var campingItems = component.get("v.items");
                campingItems.push(response.getReturnValue());
                component.set("v.items", campingItems);
            }
        });
        $A.enqueueAction(action);
    },

        validateCampingListForm: function(component) {

        // Simplistic error checking
        var validCampingItem = true;

        // Name must not be blank
        var nameField = component.find("campingItemName");
        var campingItemName = nameField.get("v.value");
        if ($A.util.isEmpty(campingItemName)){
            validCampingItem = false;
            nameField.set("v.errors", [{message:"Camping Item name can't be blank."}]);
        }
        else {
            nameField.set("v.errors", null);
        }

        // Quantity must be set, must be a positive number
        var quantityField = component.find("itemQuantity");
        var quantity = quantityField.get("v.value");
        if ($A.util.isEmpty(quantity) || isNaN(quantity) || (quantity <= 0.0)){
            validCampingItem = false;
            quantityField.set("v.errors", [{message:"Enter the quantity of the Camping Item."}]);
        }
        else {
            // If the price looks good, unset any errors...
            quantityField.set("v.errors", null);
        }
    
        // Price must be set, must be a positive number
        var priceField = component.find("itemPrice");
        var price = priceField.get("v.value");
        if ($A.util.isEmpty(price) || isNaN(price) || (price <= 0.0)){
            validCampingItem = false;
            priceField.set("v.errors", [{message:"Enter an Camping Item price."}]);
        }
        else {
            // If the price looks good, unset any errors...
            priceField.set("v.errors", null);
        }
    
        return(validCampingItem);
    }
})