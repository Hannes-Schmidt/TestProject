/*createComponentController.js*/
({
    doInit : function(cmp) {
        var cmpArray = [["ui:message", {"title": "messageTitle", "severity": "warning"}]];
        for(var i = 0; i < 3; i++) {
            var textCmp = ["ui:outputText", {"value": "messageBody", "class": "outputText"}];
            cmpArray.push(textCmp);
        }

        var body = cmp.get("v.body");
        
        $A.createComponents(
            cmpArray,
            function(components) {
                var message = components[0];
                var outputTextCmps = [];
                for (var j = 1; j < components.length; j++) {
                    outputTextCmps.push(components[j]);
                }
                	message.set("v.body", outputTextCmps);
                    body.push(message);
                    cmp.set("v.body", body)
            }
        );
    },

    handlePress : function(cmp) {
        var button = cmp.find({ instancesOf : "ui:button" })[0];
        button.set("v.label", "test");
    }
})