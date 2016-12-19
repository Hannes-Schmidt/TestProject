({
    saveExpense: function(component, expense, callback) {
        var action = component.get("c.saveExpense");
        action.setParams({
            "expense": expense
        });
        if (callback) {
            action.setCallback(this, callback);
        }
        $A.enqueueAction(action);
    },

    createExpense: function(component, expense) {
        this.saveExpense(component, expense, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var expenses = component.get("v.expenses");
                expenses.push(response.getReturnValue());
                component.set("v.expenses", expenses);
                console.log(component.get("v.expenses"));
                this.clearExpenseForm(component);
            }
        });
    },

    updateExpense: function(component, expense) {
        this.saveExpense(component, expense);
    },
    
    clearExpenseForm: function(component) {
        var createEvent = $A.get("e.c:expenseCreatedEvent");
        createEvent.fire();
    },
    
    validateExpenseForm: function(component) {

    	// Simplistic error checking
    	var validExpense = true;

    	// Name must not be blank
    	var nameField = component.find("expname");
    	var expname = nameField.get("v.value");
    	if ($A.util.isEmpty(expname)){
        	validExpense = false;
        	nameField.set("v.errors", [{message:"Expense name can't be blank."}]);
    	}
    	else {
        	nameField.set("v.errors", null);
    	}

    	// Amount must be set, must be a positive number
    	var amtField = component.find("amount");
    	var amt = amtField.get("v.value");
    	if ($A.util.isEmpty(amt) || isNaN(amt) || (amt <= 0.0)){
        	validExpense = false;
        	amtField.set("v.errors", [{message:"Enter an expense amount."}]);
    	}
    	else {
        	// If the amount looks good, unset any errors...
        	amtField.set("v.errors", null);
    	}
    
    	return(validExpense);
	},
	
	checkReimbursedStatus : function(component, event, expense){
    var input = component.find("input").get("v.value");
    console.log(expense);
    var reimbursedStatus = expense.Reimbursed__c;
        if(component.get("v.reimbursedStatus") == true){
            alert("This expense has already been reimbursed.");
        }else{
            if(confirm("Confirm: Reimburse this expense?")){
                expense.Reimbursed__c = true;
                var action = component.get("c.updateReimbursedStatus");
                action.setParams({
                    "expense": expense
                });
                    
                action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
         }
            else {
                console.log("Failed with state: " + state);
            }
        });

        // Send action off to be executed
        $A.enqueueAction(action);    
            }
        }
    },
    
})