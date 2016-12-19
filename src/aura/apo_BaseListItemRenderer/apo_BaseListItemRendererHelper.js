/**
 * Copyright 2016 appero GmbH 
 * All rights reserved. 
 *
 * @author: cmenzinger@appero.com
 */
({
    /**
     * Called when user clicks on certain item renderer
     */
    itemRendererClickHandler : function(component) 
    {
        var itemData = component.get("v.data");
        var disabledField = component.get("v.disabledField");

        if(disabledField && itemData.hasOwnProperty(disabledField) && itemData[disabledField] === true)
        {
            //item cannot be selected so return
            return;
        }


        var clickEvent = component.getEvent("itemRendererClick");
        clickEvent.setParams(
        {
            data: itemData
        });

        clickEvent.fire();   
    }
})