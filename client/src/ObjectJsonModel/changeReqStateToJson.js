import moment from "moment"
module.exports = {

	_getJsonDataFromChangeReqState(changeReqData){
    	console.log('changeReqData---',changeReqData)
	var data={
        "path": "/ChangeRequestRecords/",
        "userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "numeric",
                "value": changeReqData.cost,
                "name": "Cost",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": changeReqData.p_id
                    }
                ],
                "name": "Project",
                "language": null
            },
            {
                "type": "input",
                "value": changeReqData.name,
                "name": "Name",
                "language": null
            },
            {
                "type": "checkbox",
                "value": true,
                "name": "ActiveStatus",
                "language": null
            }
        ],
        "className": "changeRequest1",
        "parentId": 586,
        "key": changeReqData.name+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null
		
		}
      
         return data
	},    


    _deleteChangeReqJson(changeReqData){
        console.log('changeReqData---',changeReqData)
    var data={
        "path": "/ChangeRequestRecords/",
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
        "className": "changeRequest1",
        "parentId": 586,
        "key": changeReqData+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null,
        "id":changeReqData
        
        }
      
         return data
    },       
}