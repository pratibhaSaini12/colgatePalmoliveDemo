module.exports = {

	_getJsonDataFromTaskState(taskData,activeStatusValue){
	 var data = {
        "path": "/TaskRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "input",
                "value": taskData.Subject,
                "name": "Subject",
                "language": null
            },
            {
                "type": "input",
                "value": taskData.RelatedToObject,
                "name": "RelatedToObject",
                "language": null
            },
            {
                "type": "objects",
                "value": [{
                    "type": "object",
                    "id": taskData.RelatedToId
                }],
                "name": "RelatedTo",
                "language": null
            },
            {
                "type": "input",
                "value": taskData.Priority,
                "name": "Priority",
                "language": null
            },
            {
                "type": "input",
                "value": taskData.Status,
                "name": "Status",
                "language": null
            },
            {
                "type": "date",
                "value": taskData.DueDate	,
                "name": "DueDate",
                "language": null
            },
            {
                "type": "textarea",
                "value": taskData.Comments,
                "name": "Comments",
                "language": null
            },
            {
                "type": "checkbox",
                "value": activeStatusValue,
                "name": "ActiveStatus",
                "language": null
            },
            {
                "type": "input",
                "value": taskData.CreatedBy,
                "name": "CreatedBy",
                "language": null
            },
            {
                "type": "objects",
                "value": [{
                    "type": "object",
                    "id": 34
                }],
                "name": "UserId",
                "language": null
            },
            {
                "type": "objects",
                "value": [{
                    "type": "object",
                    "id": 32
                }],
                "name": "AssignedBy",
                "language": null
            }
        ],
        "className": "task1",
        "id": taskData.oo_id==''?0:parseInt(taskData.oo_id),
        "parentId": 134,
        "key": taskData.Subject+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null
    }
         return data
	},
}
