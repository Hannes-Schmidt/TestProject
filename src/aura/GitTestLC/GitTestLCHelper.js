/**
 * Copyright 2017 appero GmbH
 * All rights reserved.
 *
 * creationDate: Dec 19, 2016
 * author: hschmidt
 */
({
    /**
     * DescribeME
     */
    calculateValues : function(component) {
        var calculations = component.get("v.calculations");
        var x = parseInt(component.get("v.xNumber"), 10);
        var y = parseInt(component.get("v.yNumber"), 10);
        
        var calculation = {"X": x, "Y": y, "arithmeticOperator": "+", "result": x+y};
        calculations.push(calculation);
        component.set("v.calculations", calculations);
    }
})