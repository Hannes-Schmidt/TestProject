({
    handleClick: function(component, event, helper) {
        var btnLabel = event.getSource().get("v.label");        // the button // the button's label
        var checkboxValue = component.find("checkbox").get("v.value");
        console.log("handleClick : Message: " + btnLabel + "Checkbox Wert: " + checkboxValue);
        component.set("v.message", btnLabel);     // update our message
        if(checkboxValue == false){
        component.find("checkbox").set("v.value", true);
    }else{
        component.find("checkbox").set("v.value", false);
    }
    },

    handleClick2: function(component, event, helper) {
    var newMessage = event.getSource().get("v.label");
    console.log("handleClick2: Message: " + newMessage);
    component.set("v.message", newMessage);
    },

    handleClick3: function(component, event, helper) {
    component.set("v.message", event.getSource().get("v.label"));
    },

    checkboxClicked: function(component, event, helper){
        component.set("v.checkboxValue", true);
    }
})