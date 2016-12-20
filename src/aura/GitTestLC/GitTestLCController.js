/**
 * Copyright 2017 appero GmbH
 * All rights reserved.
 *
 * creationDate: Dec 19, 2016
 * author: hschmidt
 */
({
    onCalculateButtonClick: function(component, event, helper) {
        var x = component.get("v.xNumber");
        var y = component.get("v.yNumber");
        helper.calculateValues(component, x, y);
    }
    
})