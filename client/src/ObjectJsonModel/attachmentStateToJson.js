module.exports = {

	_getJsonDataFromAttachment(attachmentData){
	 
	 var data = {
        "path": "/AttachmentRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "input",
                "value": attachmentData.AttachmentName,
                "name": "AttachmentName",
                "language": null
            },
            {
                "type": "input",
                "value": attachmentData.AttachmentPath,
                "name": "AttachmentPath",
                "language": null
            },
            {
                "type": "input",
                "value": attachmentData.AttachmentObject,
                "name": "AttachmentObject",
                "language": null
            },
            {
                "type": "input",
                "value": attachmentData.ObjectId,
                "name": "ObjectId",
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
                "type": "href",
                "value": {
                    "type": "asset",
                    "subtype": attachmentData.AssetSubType,
                    "id": attachmentData.AssetId
                },
                "name": "AttachFile",
                "language": null
            },
            {
                "type": "checkbox",
                "value": attachmentData.Attachment_OO_Id==''?true:false,
                "name": "ActiveStatus",
                "language": null
            }
        ],
        "className": "attachment1",
        "id": attachmentData.oo_id==''?0:parseInt(attachmentData.Attachment_OO_Id),
        "parentId": 421,
        "key": attachmentData.AttachmentName+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null
    }
         return data
	},      
   _jsonDataForDeleteAttachment(attachmentData){
       var data={
        "path": "/AttachmentRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "checkbox",
                "value": false,
                "name": "ActiveStatus",
                "language": null
            }
        ],
        "className": "attachment1",
        "id":attachmentData.Attachment_OO_Id,
        "parentId": 421,
        "published": true,
        "type": "object",
        "userOwner": 2,
        "key": new Date(),
        "properties": null
    }
     return data
    },
}