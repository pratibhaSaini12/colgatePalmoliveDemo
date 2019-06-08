import moment from "moment"
module.exports = {

	_getJsonDataFromResourcesAllocationState(resourceAllocationData){
        console.log('resourceAllocationData--',resourceAllocationData)
	 	var data={
		"userModification": 2,
        "childs": null,
        "elements": [
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": resourceAllocationData.ResourceId
                    }
                ],
                "name": "ResourceName",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": resourceAllocationData.ProjectId
                    }
                ],
                "name": "ProjectName",
                "language": null
            },

            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": resourceAllocationData.AccountId
                    }
                ],
                "name": "AccountName",
                "language": null
            },
            {
                "type": "date",
                "value": (resourceAllocationData.startDate).format('YYYY-MM-DD'),
                "name": "StartDate",
                "language": null
            },
            {
                "type": "date",
                "value": (resourceAllocationData.endDate).format('YYYY-MM-DD'),
                "name": "EndDate",
                "language": null
            },
            {
                "type": "numeric",
                "value": resourceAllocationData.Allocation,
                "name": "Allocation",
                "language": null
            },
            {
                "type": "input",
                "value": resourceAllocationData.Role,
                "name": "Role",
                "language": null
            },
            {
                "type": "input",
                "value": resourceAllocationData.CreatedBy,
                "name": "CreatedBy",
                "language": null
            },
            {
                "type": "checkbox",
                "value": true,
                "name": "ActiveStatus",
                "language": null
            }
            
        ],
        "className": "resourceAllocation1",
        "parentId": 135,
        "key": resourceAllocationData.ResourceId+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null,
	    "id": resourceAllocationData.oo_id==''?0:parseInt(resourceAllocationData.oo_id), 
		
      }
      
         return data
	},  


    _jonDataToDelFromResourcesAllocationState(resourceAllocationData) {
        console.log('resourceAllocationData to delete...',resourceAllocationData)
        var data = {
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
            "className": "resourceAllocation1",
            "parentId": 135,
            "key": resourceAllocationData.ResourceId + "_" + new Date(),
            "published": true,
            "type": "object",
            "userOwner": 2,
            "properties": null,
            "id": resourceAllocationData.oo_id == '' ? 0 : parseInt(resourceAllocationData.oo_id),

        }
        return data
    },
}