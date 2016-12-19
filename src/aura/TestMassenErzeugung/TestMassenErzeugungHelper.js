({
    loadOptions: function (component) {

        var action = component.get("c.getTemplates");

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var templates = response.getReturnValue();
                var defaultTemplateId = templates[0].Id;
                component.set("v.templates", templates);
                var cmp = component.find("templateSelect");
                cmp.set("v.body", []); // clear all options
                var body = cmp.get("v.body");

                templates.forEach(function (tmp) {
                    $A.createComponent(
                            "aura:html",
                            {
                                tag: "option",
                                HTMLAttributes: {
                                    value: tmp.Id,
                                    label: tmp.Name
                                }
                            },

                            function (newOption) {
                                //Add options to the body
                                if (component.isValid()) {
                                    body.push(newOption);
                                    cmp.set("v.body", body);
                                }
                            });
                });
                
                cmp.set("v.value", defaultTemplateId);
            }
        });

        $A.enqueueAction(action);
        
        this.changePublicationCycle(component);
    },
    
    sendTemplate : function (component) {
    
        if(this.validateForm(component)) {
            var weekdays = this.setWeekdays(component);

            var action = component.get("c.duplicateTemplate");
            action.setParams({
                "templateId": component.get("v.selectedTemplateId"),
                "issueNumber": component.get("v.issueNumber"),
                "publicationCycle": component.get("v.publicationCycle"),
                "weekdays": weekdays,
                "numberOfIssues": component.get("v.numberOfIssues"),
                "startDateString": component.get("v.startDate"),
                "daysBeforeClosingDate": component.get("v.daysBeforeClosingDate"),
                "daysBeforeSubmissionDeadline": component.get("v.daysBeforeSubmissionDeadline")
            });
        
            $A.enqueueAction(action);
        } else {
            var cmp = component.find("formValidationErrorMessageContainer");
            var body = cmp.get("v.body");
            var weekdayCheckboxErrorMessage = "";
            
            if(component.get("v.publicationCycle") === "daily") {
                weekdayCheckboxErrorMessage = component.get("v.weekdayCheckboxErrorMessage");
            }

            $A.createComponents([
                    ["ui:message",
                    {
                        "title": component.get("v.formValidationErrorMessage"),
                        "severity": "warning",
                        "closable": "true"
                    }],
                    ["ui:outputText",
                    {
                        "value": weekdayCheckboxErrorMessage
                    }]
                    ],
                    function (components) {
                        var message = components[0];
                        var outputText = components[1];
                        message.set("v.body", outputText);
                        body.push(message);
                        cmp.set("v.body", body);
                    });
        }
    },
    
    setWeekdays : function (component) {
        var publicationCycle = component.get("v.publicationCycle");
        var weekdays = component.get("v.weekdayCheckboxes");
        
        if(publicationCycle !== "daily") {
            for(var i = 0; i < weekdays.length; i++) {
                if(i == component.get("v.selectedWeekday")) {
                    weekdays[i] = true;
                } else {
                    weekdays[i] = false;
                }
            }
        }
        
        return weekdays;
    },
    
    changePublicationCycle : function (component) {
            if(component.get("v.publicationCycle") === "daily") {
            $A.util.removeClass(component.find("weekdayCheckboxes"), "hide");
            $A.util.addClass(component.find("weekdaySelect"), "hide");
        } else {
            $A.util.removeClass(component.find("weekdaySelect"), "hide");
            $A.util.addClass(component.find("weekdayCheckboxes"), "hide");
        }
    },

    validateForm : function (component) {
    
        var validForm = true;
    
        var inputComponents = [];
        
        inputComponents.push(component.find("issueNumberInput"));
        inputComponents.push(component.find("numberOfIssuesInput"));
        inputComponents.push(component.find("startDateInput"));
        inputComponents.push(component.find("daysBeforeClosingDateInput"));
        inputComponents.push(component.find("daysBeforeSubmissionDeadlineInput"));
        
        for(var i = 0; i < inputComponents.length; i++){
            if(inputComponents[i].get("v.validity") === null){
                validForm = false;
            } else {
                if(!inputComponents[i].get("v.validity").valid){
                    validForm = false;
                }
            }
        }

        if(component.get("v.publicationCycle") === "daily") {
            var weekdayCheckboxes = component.get("v.weekdayCheckboxes");
            var selectedCheckboxes = 0;
            for(var i = 0; i < weekdayCheckboxes.length; i++){
                if(weekdayCheckboxes[i]) {
                    selectedCheckboxes++;
                }
            }
            
            if(selectedCheckboxes < 2) {
                validForm = false;
            }
        }
        
        return validForm;
    }
})