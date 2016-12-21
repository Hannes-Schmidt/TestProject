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
        var x = parseFloat(component.get("v.xNumber"), 10);
        var y = parseFloat(component.get("v.yNumber"), 10);
        var operator = component.get("v.operator");
        var result;
        
        if(operator === "+") {
            result = x + y;
        } else {
            if(operator === "-") {
                result = x - y;
            } else {
                if(operator === "*") {
                    result = x * y;
                } else {
                    if(operator === "/") {
                        result = x / y;
                    }
                }
            }
        }
        
        var calculation = {"X": x, "Y": y, "arithmeticOperator": operator, "result": result};
        calculations.push(calculation);
        calculations = this.checkCalculationsArrayLength(calculations);
        component.set("v.calculations", calculations);
    },
    
    checkCalculationsArrayLength: function(calculations) {
        if(calculations.length > 5) {
            calculations.shift();
        }
        return calculations
    }
})