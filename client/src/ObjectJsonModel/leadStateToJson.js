module.exports = {

	_getJsonDataFromLeadState(leadData,activeStatusValue,token){
	 var data = {
        "path": "/LeadRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "input",
                "value": leadData.FirstName,
                "name": "FirstName",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.LastName,
                "name": "LastName",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.Company,
                "name": "Company",
                "language": null
            },
            {
               "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": leadData.OwnerId
                    }
                ],
                "name": "LeadOwner",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.Title,
                "name": "Title",
                "language": null
            },
            {
                "type": "email",
                "value": leadData.email,
                "name": "email",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.LeadSource,
                "name": "LeadSource",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.LeadStatus,
                "name": "LeadStatus",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(leadData.Phone),
                "name": "Phone",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(leadData.Mobile),
                "name": "Mobile",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(leadData.OtherPhone),
                "name": "OtherPhone",
                "language": null
            },
            {
                "type": "input",
                "value": parseInt(leadData.Fax),
                "name": "Fax",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.Industry,
                "name": "Industry",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(leadData.YearFounded),
                "name": "YearFounded",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(leadData.AnnualRevenue),
                "name": "AnnualRevenue",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.Website,
                "name": "Website",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(leadData.NoOfEmployees),
                "name": "NoOfEmployees",
                "language": null
            },
            {
                "type": "textarea",
                "value": leadData.Description,
                "name": "Description",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.Salutation,
                "name": "Salutation",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.Street,
                "name": "Street",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.City,
                "name": "City",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.State,
                "name": "State",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.Zip,
                "name": "Zip",
                "language": null
            },
            {
                "type": "input",
                "value": leadData.Country,
                "name": "Country",
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
            }
        ],
        "className": "lead1",
        "id": leadData.oo_id==''?0:parseInt(leadData.oo_id),
        "parentId": 2,
        "key": leadData.FirstName+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null,
				"token": token
    }
         return data
	},

    _jsonDataForDeleteLead(leadData,activeStatusValue){
     var data = {
        "path": "/LeadRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "checkbox",
                "value": activeStatusValue,
                "name": "ActiveStatus",
                "language": null
            }
        ],
        "className": "lead1",
        "id": leadData.lead_oo_id,
        "parentId": 2,
        "key": leadData.lead_oo_id+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null
    }
         return data
    },
}
