({
	clickCreateExpense: function(component, event, helper) {
        if(helper.validateExpenseForm(component)){
            // Create the new expense
            var newExpense = component.get("v.newExpense");
            helper.createExpense(component, newExpense);
        }
    },
    
    handleClearExpenseForm: function(component, event, helper){
                  console.log("Test");
                  component.find("expname").set("v.value","");
                  component.find("amount").set("v.value",0);
                  component.find("client").set("v.value","");
                  component.find("expdate").set("v.value","");
                  component.find("reimbursed").set("v.value",false);
    }
})