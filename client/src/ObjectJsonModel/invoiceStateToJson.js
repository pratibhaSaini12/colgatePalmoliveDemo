module.exports = {

	_getJsonDataFromInvoiceState(invoiceData,activeStatusValue){
	 var data = {
     "path": "/InvoiceRecords/",
     "userModification": 2,
     "childs": null,
     "elements": [
         {
             "type": "input",
             "value": invoiceData.Status,
             "name": "Status",
             "language": null
         },
         {
             "type": "objects",
             "value": [
                 {
                     "type": "object",
                     "id": invoiceData.Account_ooId
                 }
             ],
             "name": "Account",
             "language": null
         },
         {
             "type": "numeric",
             "value": parseInt(invoiceData.Amount),
             "name": "Amount",
             "language": null
         },
         {
             "type": "input",
             "value": invoiceData.CreatedBy,
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
             "type": "textarea",
             "value": invoiceData.Description,
             "name": "Description",
             "language": null
         },
         {
             "type": "numeric",
             "value": parseInt(invoiceData.PaymentTerms),
             "name": "PaymentTerms",
             "language": null
         },
         {
             "type": "input",
             "value": invoiceData.InvoiceNo,
             "name": "InvoiceNo",
             "language": null
         },
         {
             "type": "textarea",
             "value": invoiceData.Notes,
             "name": "Notes",
             "language": null
         },
         {
             "type": "objects",
             "value": [
                 {
                     "type": "object",
                     "id": invoiceData.ProjectId
                 }
             ],
             "name": "ProjectName",
             "language": null
         },
         {
             "type": "input",
             "value": invoiceData.Month,
             "name": "Month",
             "language": null
         },
         {
             "type": "input",
             "value": invoiceData.Year,
             "name": "Year",
             "language": null
         },
         {
             "type": "input",
             "value": invoiceData.SwiftCode,
             "name": "SwiftCode",
             "language": null
         },
         {
             "type": "input",
             "value": invoiceData.AccountNumber,
             "name": "AccountNumber",
             "language": null
         },
         {
             "type": "input",
             "value": invoiceData.RoutingNumber,
             "name": "RoutingNumber",
             "language": null
         },
         {
             "type": "input",
             "value": invoiceData.BankName,
             "name": "BankName",
             "language": null
         },
         {
             "type": "input",
             "value": invoiceData.PaymentMethod,
             "name": "PaymentMethod",
             "language": null
         }
     ],
     "className": "invoice1",
     "id":  invoiceData.oo_id==''?0:parseInt(invoiceData.oo_id),
     "parentId": 16,
     "key": invoiceData.InvoiceNo+"_"+new Date(),
     "published": true,
     "type": "object",
     "userOwner": 2,
     "properties": null
    }
         return data
	},
}
