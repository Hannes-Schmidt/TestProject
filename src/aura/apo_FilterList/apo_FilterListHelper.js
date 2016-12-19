/**
 * Copyright 2016 appero GmbH 
 * All rights reserved. 
 *
 * @author: cmenzinger@appero.com
 */
({
    /**
     * Creates initial list with all elements from the data provider
     */
    createListElementsFromDataProvider : function(component) 
    {
        var listItemRendererComponent = component.get("v.listItemRendererComponentName");
        var dataProvider = component.get("v.dataProvider");
        var listElementsContainer = component.find("listElementsContainer");
        var i = 0;
        var n = dataProvider.length;

        //clear visualization
        listElementsContainer.set("v.body", []);

        for(i; i < n; i++) 
        {
            $A.createComponent(
                listItemRendererComponent, 
                {
                    data: dataProvider[i],
                    itemRendererClick: component.getReference("c.onItemRendererClick")
                }, 
                function(newComponent)
                {
                    var bodyContainerArray = listElementsContainer.get("v.body");
                    bodyContainerArray.push(newComponent);
                    listElementsContainer.set("v.body", bodyContainerArray);
                }
            );
        }
    },

    /**
     * Checks each list element created from the dataProvider struture if it matches the search text and
     * displays or hides it.
     */
    filterListElements : function(component) 
    {
        var searchText = component.get("v.searchText");
        var searchField = component.get("v.searchField");
        var dataProvider = component.get("v.dataProvider");
        var listElementsContainer = component.find("listElementsContainer");
        var listElements = listElementsContainer.get("v.body");
        var element;
        var elementData;
        var elementSearchString;

        //validate search text
        if($A.util.isUndefinedOrNull(searchText))
        {
            searchText = "";
        }
        else
        {
            //normalize the search string using lowercase and single empty spaces for all empty spaces like tabs
            searchText = searchText.toLowerCase().replace(/\s+/g, " ");
        }

        //display or hide each list element
        var i = 0;
        var n = listElements.length;

        for (i; i < n; i++)
        {

            element = listElements[i];
            elementData = dataProvider[i];

            //check if elementData is a object like structure or defines directly the search string
            if(!$A.util.isUndefinedOrNull(searchField) && elementData.hasOwnProperty(searchField))
            {
                elementSearchString = elementData[searchField].toLowerCase();
            }
            else
            {
                elementSearchString = elementData.toLowerCase();
            }

            //check if each word in search string matches independently
            var searchArray = searchText.split(" ");
            var notMatchingFlag = false;
            var searchI = 0;
            var searchN = searchArray.length;

            //look if every single word is matching, if one does not we can break and hide the element
            for (searchI; searchI < searchN; searchI++)
            {
                if (elementSearchString.indexOf(searchArray[searchI]) === -1)
                {
                    notMatchingFlag = true;
                    break;
                }
            }
            
            if(notMatchingFlag === true)
            {
                $A.util.addClass(element, "slds-hide");
            }
            else
            {
                $A.util.removeClass(element, "slds-hide");
            }
        }
    },

    /**
     * Selects concrete element on a given index
     */
    selectListItemByIndex : function(component, index)
    {
        var listElements = component.find("listElementsContainer").get("v.body");

        if(!$A.util.isUndefinedOrNull(listElements) && listElements.length > index)
        {
            this.selectListItem(component, listElements[index]);
        }
    },

    /**
     * Set certain list item selected
     */
    selectListItem : function(component, listItemRenderer)
    {
        if(!$A.util.isUndefinedOrNull(listItemRenderer) && listItemRenderer.isValid())
        {
            //deselect all items
            var listElements = component.find("listElementsContainer").get("v.body");
            
            var i = 0;
            var n = listElements.length;

            for (i; i < n; i++)
            {
                listElements[i].set("v.isSelected", false);
            }
            

            //select item renderer
            listItemRenderer.set("v.isSelected", true);

            //dispatch select event
            var selectEvent = component.getEvent("listItemSelect");

            selectEvent.setParams({
                data: listItemRenderer.get("v.data")
            });

            selectEvent.fire();
        }
    }
})