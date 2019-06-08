import moment from "moment"
module.exports = {

	_getJsonDataFromProjectState(projectData){
    console.log('projectData--',projectData)
	 	
	var data={
		"userModification": 2,
        "childs": null,
		 "elements": [
            {
                "type": "input",
                "value": projectData.ProjectName,
                "name": "ProjectName",
                "language": null
            },
            {
                "type": "input",
                "value": projectData.CreatedBy,
                "name": "CreatedBy",
                "language": null
            },
            {
                "type": "input",
                "value": projectData.Type,
                "name": "ProjectType",
                "language": null
            },
            {
                "type": "input",
                "value": projectData.Technology,
                "name": "Technology",
                "language": null
            },
            {
                "type": "input",
                "value": projectData.Status,
                "name": "Status",
                "language": null
            },
            {
                "type": "numeric",
                "value": projectData.InitialProjectCost,
                "name": "InitialProjectCost",
                "language": null
            },
            {
                "type": "numeric",
                "value": projectData.ActualProjectCost,
                "name": "ActualProjectCost",
                "language": null
            },
            {
                "type": "date",
                "value": moment(projectData.startDate).format('YYYY-MM-DD'),
                "name": "StartDate",
                "language": null
            },
            {
                "type": "date",
                "value": moment(projectData.endDate).format('YYYY-MM-DD'),
                "name": "EndDate",
                "language": null
            },
            {
                "type": "objects",
                "value": projectData.ResourceId? [
                    {
                        "type": "object",
                        "id": projectData.ResourceId
                    }
                ]:null,
                "name": "ProjectManager",
                "language": null
            },
            {
                "type": "objects",
                "value": [
                    {
                        "type": "object",
                        "id": projectData.Account_ooId
                    }
                ],
                "name": "Account",
                "language": null
            },
            {
                "type": "textarea",
                "value": projectData.Description,
                "name": "Description",
                "language": null
            },
            {
                "type": "input",
                "value": projectData.ProjectFile,
                "name": "ProjectFile",
                "language": null
            },
            {
                "type": "href",
                "value": {
                    "type": "asset",
                    "subtype": 'Image',
                    "id": projectData.AssetId
                },
                "name": "SowName",
                "language": null
            },
           {
                "type": "checkbox",
                "value": true,
                "name": "ActiveStatus",
                "language": null
            }
         ],
        "className": "project1",
        "parentId": 14,
        "key": projectData.ProjectName+"_"+new Date(),
        "published": true,
        "type": "object",
        "userOwner": 2,
        "properties": null,
	    "id": projectData.oo_id==''?0:parseInt(projectData.oo_id),
		}
      
         return data
	},


    __jsonDataToDelProject(projectData) {
        var data = {
            "userModification": 2,
            "childs": null,
            "elements": [{
                "type": "checkbox",
                "value": false,
                "name": "ActiveStatus",
                "language": null
            }],
            "className": "project1",
            "parentId": 14,
            "key": projectData.ProjectName + "_" + new Date(),
            "published": true,
            "type": "object",
            "userOwner": 2,
            "properties": null,
            "id": parseInt(projectData.id),
        }


        return data
    },
}