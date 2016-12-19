({
	saveContact : function(component) {
		component.find("recordHandler").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // Saved! Show a toast UI message
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "The record was updated."
                });
                resultsToast.fire();
                // Reload the view so components not using force:recordPreview
                // are updated
                $A.get("e.force:refreshView").fire();
            }
            else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            }
                else if (saveResult.state === "ERROR") {
                    console.log('Problem saving record, error: ' +
                                JSON.stringify(saveResult.error));
                }
                    else {
                        console.log('Unknown problem, state: ' + saveResult.state +
                                    ', error: ' + JSON.stringify(saveResult.error));
                    }
        }));
	}
})