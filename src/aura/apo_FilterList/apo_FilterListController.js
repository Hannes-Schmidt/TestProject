/**
 * Copyright 2016 appero GmbH 
 * All rights reserved. 
 *
 * @author: cmenzinger@appero.com
 */
({
    /////////////
    // methods //
    /////////////
    /**
     * Sets list item on certain index of data provider as selected
     */
    onSetSelectedIndex : function(component, event, helper) 
    {
        helper.selectListItemByIndex(component, event.getParam("arguments").index);
    },


    //////////////////////////
    // system event handler //
    //////////////////////////
    /**
     * Triggered when data provider changes
     */
    onDataProviderChange : function(component, event, helper)
    {
        helper.createListElementsFromDataProvider(component);
    },




    ///////////////////////
    // gui event handler //
    ///////////////////////
    /**
     * Called when user types in search text input
     */
    onSearchTextChange : function(component, event, helper) {
       helper.filterListElements(component);
    },

    /**
     * Assigned as action for item renderer items
     */
    onItemRendererClick : function(component, event, helper)
    {
        //TODO check if item could be selected, otherwise we could do
        //event.stopPropagation();
        
        //apply selection in list item component
        helper.selectListItem(component, event.getSource());
    }
})