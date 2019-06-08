module.exports = {

	_getJsonDataFromOpportunityState(opportunityData,activeStatusValue){
	 	console.log("===in _getJsonDataFromContactState====",opportunityData)
		 var data = {
        "path": "/OpportuintyRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "input",
                "value": opportunityData.OpprtunityName,
                "name": "OpprtunityName",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Owner,
                "name": "OpportunityOwner",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Owner,
                "name": "AccountManager",
                "language": null
            },
            {
                "type": "date",
                "value": null,
                "name": "CloseDate",
                "language": null
            },
            {
                "type": "numeric",
                "value": opportunityData.AnnualRevenue,
                "name": "Amount",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Stage,
                "name": "Stage",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.LeadStatus,
                "name": "Status",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Probability,
                "name": "Probability",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.LeadSource,
                "name": "LeadSource",
                "language": null
            },
            {
                "type": "textarea",
                "value": opportunityData.Description,
                "name": "Description",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": opportunityData.Account_ooId
                    }
                ],
                "name": "Account",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Street,
                "name": "Street",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.City,
                "name": "City",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.State,
                "name": "State",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Country,
                "name": "Country",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Zip,
                "name": "Zip",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": 36
                    }
                ],
                "name": "CreatedBy",
                "language": null
            },
            {
                "type": "checkbox",
                "value": activeStatusValue,
                "name": "ActiveStatus",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": contactId
                    }
                ],
                "name": "Contact",
                "language": null
            }
        ],
        "className": "opportunity1",
        "id": opportunityData.oo_id==''?0:parseInt(opportunityData.oo_id),
        "parentId": 7,
        "key": opportunityData.OpprtunityName+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null
      }
         return data
	},  

	_getJsonDataFromLeadOpportunityState(opportunityData,activeStatusValue,contactId){
	 	
		 var data = {
        "path": "/OpportuintyRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "input",
                "value": opportunityData.OpprtunityName,
                "name": "OpprtunityName",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Owner,
                "name": "OpportunityOwner",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Owner,
                "name": "AccountManager",
                "language": null
            },
            {
                "type": "date",
                "value": new Date(),
                "name": "CloseDate",
                "language": null
            },
            {
                "type": "numeric",
                "value": opportunityData.AnnualRevenue,
                "name": "Amount",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Stage,
                "name": "Stage",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.LeadStatus,
                "name": "Status",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Probability,
                "name": "Probability",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.LeadSource,
                "name": "LeadSource",
                "language": null
            },
            {
                "type": "textarea",
                "value": opportunityData.Description,
                "name": "Description",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": opportunityData.Account_ooId
                    }
                ],
                "name": "Account",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Street,
                "name": "Street",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.City,
                "name": "City",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.State,
                "name": "State",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Country,
                "name": "Country",
                "language": null
            },
            {
                "type": "input",
                "value": opportunityData.Zip,
                "name": "Zip",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": 36
                    }
                ],
                "name": "CreatedBy",
                "language": null
            },
            {
                "type": "checkbox",
                "value": activeStatusValue,
                "name": "ActiveStatus",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": contactId
                    }
                ],
                "name": "Contact",
                "language": null
            }
        ],
        "className": "opportunity1",
        "id": 0,
        "parentId": 7,
        "key": opportunityData.OpprtunityName+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null
      }
         return data
	},          
}