module.exports = {

	_getJsonDataFromContactState(contactData,activeStatusValue){
	 console.log("===in _getJsonDataFromContactState====",contactData)
	 var data = {
        "path": "/ContactRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "input",
                "value": contactData.FirstName,
                "name": "FirstName",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.LastName,
                "name": "LastName",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(contactData.Phone),
                "name": "Phone",
                "language": null
            },
            {
                "type": "email",
                "value": contactData.email,
                "name": "email",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.Title,
                "name": "Title",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(contactData.Mobile),
                "name": "Mobile",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(contactData.OtherPhone),
                "name": "OtherPhone",
                "language": null
            },
            {
                "type": "input",
                "value": parseInt(contactData.Fax),
                "name": "Fax",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.MailingStreet,
                "name": "MailingStreet",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.MailingCity,
                "name": "MailingCity",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.MailingState,
                "name": "MailingState",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.MailingZip,
                "name": "MailingZip",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.MailingCountry,
                "name": "MailingCountry",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": contactData.Account_ooId
                    }
                ],
                "name": "Account",
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
        "className": "contact1",
        "id": contactData.oo_id==''?0:parseInt(contactData.oo_id),
        "parentId": 8,
        "key": contactData.FirstName+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null
    }
         return data
	},   
    _getJsonDataFromOpportunityContactState(contactData,activeStatusValue){
     
     var data = {
        "path": "/ContactRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "input",
                "value": contactData.ContactName,
                "name": "FirstName",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.LastName,
                "name": "LastName",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(contactData.Phone),
                "name": "Phone",
                "language": null
            },
            {
                "type": "email",
                "value": contactData.email,
                "name": "email",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.Title,
                "name": "Title",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(contactData.Mobile),
                "name": "Mobile",
                "language": null
            },
            {
                "type": "numeric",
                "value": parseInt(contactData.OtherPhone),
                "name": "OtherPhone",
                "language": null
            },
            {
                "type": "input",
                "value": parseInt(contactData.Fax),
                "name": "Fax",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.Street,
                "name": "MailingStreet",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.City,
                "name": "MailingCity",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.State,
                "name": "MailingState",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.Zip,
                "name": "MailingZip",
                "language": null
            },
            {
                "type": "input",
                "value": contactData.Country,
                "name": "MailingCountry",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": contactData.Account_ooId
                    }
                ],
                "name": "Account",
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
        "className": "contact1",
        "id": 0,
        "parentId": 8,
        "key": contactData.ContactName+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null
    }
         return data
    },   
}