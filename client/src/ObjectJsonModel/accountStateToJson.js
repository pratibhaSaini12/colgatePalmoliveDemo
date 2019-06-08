module.exports = {

	_getJsonDataFromAccountState(accountData,activeStatusValue){
	 	console.log("===in _getJsonDataFromContactState====",accountData)
	var data={
		"path": "/AccountRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "input",
                "value": accountData.AccountName,
                "name": "AccountName",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.Website,
                "name": "Website",
                "language": null
            },
            {
                "type": "numeric",
                "value": accountData.YearFounded,
                "name": "YearFounded",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.Industry,
                "name": "Industry",
                "language": null
            },
            {
                "type": "numeric",
                "value": accountData.AnnualRevenue,
                "name": "AnnualRevenue",
                "language": null
            },
            {
                "type": "numeric",
                "value": accountData.Employees,
                "name": "Employees",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.BillingStreet,
                "name": "BillingStreet",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.BillingCity,
                "name": "BillingCity",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.BillingState,
                "name": "BillingState",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.BillingZip,
                "name": "BillingZip",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.AccountOwner,
                "name": "AccountOwner",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.BillingCountry,
                "name": "BillingCountry",
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
        "className": "account1",
        "id": accountData.oo_id==''?0:parseInt(accountData.oo_id),
        "parentId": 5,
        "key": accountData.AccountName+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null
      }
         return data
	},

    _getJsonDataFromOppAccountState(accountData,activeStatusValue){
        
    var data={
        "path": "/AccountRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "input",
                "value": accountData.AccountName,
                "name": "AccountName",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.Website,
                "name": "Website",
                "language": null
            },
            {
                "type": "numeric",
                "value": accountData.YearFounded,
                "name": "YearFounded",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.Industry,
                "name": "Industry",
                "language": null
            },
            {
                "type": "numeric",
                "value": accountData.AnnualRevenue,
                "name": "AnnualRevenue",
                "language": null
            },
            {
                "type": "numeric",
                "value": accountData.NoOfEmployees,
                "name": "Employees",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.Street,
                "name": "BillingStreet",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.City,
                "name": "BillingCity",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.State,
                "name": "BillingState",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.Zip,
                "name": "BillingZip",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.Owner,
                "name": "AccountOwner",
                "language": null
            },
            {
                "type": "input",
                "value": accountData.Country,
                "name": "BillingCountry",
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
        "className": "account1",
        "id": 0,
        "parentId": 5,
        "key": accountData.AccountName+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null
      }
         return data
    },
}