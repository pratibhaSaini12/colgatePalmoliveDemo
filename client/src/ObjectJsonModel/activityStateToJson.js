module.exports = {

	_getJsonDataFromActivityState(activityData){

	 var data = {
        "path": "/ActivityRecord/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "input",
                "value": activityData.CallTo,
                "name": "CallTo",
                "language": null
            },
            {
                "type": "input",
                "value": activityData.ObjectId,
                "name": "ObjectId",
                "language": null
            },
            {
                "type": "input",
                "value": activityData.ActivityType,
                "name": "ActivityType",
                "language": null
            },
            {
                "type": "input",
                "value": activityData.Object,
                "name": "ActivityObject",
                "language": null
            },
            {
                "type": "input",
                "value": activityData.Notes,
                "name": "Notes",
                "language": null
            },
            {
                "type": "checkbox",
                "value": activityData.oo_id==''?true:false,
                "name": "ActiveStatus",
                "language": null
            }
        ],
        "className": "activity1",
        "id": activityData.oo_id==''?0:parseInt(activityData.oo_id),
        "parentId": 429,
        "key": activityData.CallTo+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null,
				"token": token
    }
         return data
	},
}
