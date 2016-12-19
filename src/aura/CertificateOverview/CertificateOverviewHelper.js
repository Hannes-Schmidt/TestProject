({
    getData : function(component) {
        var role1 = {Portfolio: "Portfolio1", Role: "Sales", CertifiedTotal: 2, CertifiedExperts: 1, MasterTotal: 4, MasterExperts: 2, ProfessionalTotal: 2, ProfessionalExperts: 0, AuthorizedTotal: 0, AuthorizedExperts: 0};
        var role2 = {Portfolio: "Portfolio1", Role: "Technical Sales", CertifiedTotal: 1, CertifiedExperts: 0, MasterTotal: 1, MasterExperts: 1, ProfessionalTotal: 0, ProfessionalExperts: 0, AuthorizedTotal: 0, AuthorizedExperts: 0};
        var role3 = {Portfolio: "Portfolio1", Role: "Implementation", CertifiedTotal: 2, CertifiedExperts: 1, MasterTotal: 2, MasterExperts: 2, ProfessionalTotal: 2, ProfessionalExperts: 0, AuthorizedTotal: 0, AuthorizedExperts: 0};
        var portfolio1 = [role1, role2, role3];
        
        var role4 = {Portfolio: "Portfolio2", Role: "Sales", CertifiedTotal: 1, CertifiedExperts: 1, MasterTotal: 4, MasterExperts: 2, ProfessionalTotal: 2, ProfessionalExperts: 0, AuthorizedTotal: 1, AuthorizedExperts: 0};
        var role5 = {Portfolio: "Portfolio2", Role: "Technical Sales", CertifiedTotal: 2, CertifiedExperts: 1, MasterTotal: 1, MasterExperts: 1, ProfessionalTotal: 0, ProfessionalExperts: 0, AuthorizedTotal: 0, AuthorizedExperts: 0};
        var portfolio2 = [role4, role5];
        
        var portfolioList = [portfolio1, portfolio2];
        component.set("v.portfolioList", portfolioList);
        
        this.getSelectOptions(component, portfolioList);
    },
    
    getSelectOptions : function(component, portfolioList) {
        var defaultPortfolio = portfolioList[0];
        var portfolioSelect = component.find("portfolioSelect");
        var portfolioSelectBody = portfolioSelect.get("v.body");
        
        var i = 0;
        portfolioList.forEach(function (portfolio) {
            $A.createComponent(
                "aura:html",
                {
                    tag: "option",
                    HTMLAttributes: {
                        value: i,
                        label: portfolio[i].Portfolio
                    }
                },
                
                function (newOption) {
                    //Add options to the body
                    if (component.isValid()) {
                        portfolioSelectBody.push(newOption);
                        portfolioSelect.set("v.body", portfolioSelectBody);
                    }
                });
            	component.set("v.portfolio", defaultPortfolio);
            	i = i + 1;
        });
    },
    
    setPortfolio : function(component) {
        var portfolioSelectValue = component.find("portfolioSelect").get("v.value");
        var portfolioList = component.get("v.portfolioList");
        var selectedPortfolio = portfolioList[portfolioSelectValue];
        
        /*for(var i = 0; i < selectedPortfolio.length; i++) {
            var certsTotal = [selectedPortfolio[i].CertifiedTotal, selectedPortfolio[i].MasterTotal, selectedPortfolio[i].ProfessionalTotal, selectedPortfolio[i].AuthorizedTotal];
        	var certsExp = [selectedPortfolio[i].CertifiedExperts, selectedPortfolio[i].MasterExperts, selectedPortfolio[i].ProfessionalExperts, selectedPortfolio[i].AuthorizedExperts];
            
            var certsTotalReady = [];
            var certsExpReady = [];
            for(var j = 0; j < certsTotal.length; j++) {
                var certsTotalString = "";
                var certsExpString = "(0)";
                if(certsTotal[j] != 0) {
                      = "";
                } 
            }
        }*/
        component.set("v.portfolio", selectedPortfolio);
    }
})