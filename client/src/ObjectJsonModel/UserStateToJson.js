 module.exports = {

	_getJsonDataFromUserState(leadData){
		var data={
		    "path": "/user/",
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
		        "type": "email",
		        "value": leadData.email,
		        "name": "email",
		        "language": null
		      },
		      {
		        "type": "checkbox",
		        "value": leadData.Active,
		        "name": "Active",
		        "language": null
		      },
		      {
		        "type": "objects",
		        "value": [
		          {
		            "type": "object",
		            "id": leadData.userRoleObject.id
		          }
		        ],
		        "name": "Role",
		        "language": null
		      },
		      {
		        "type": "input",
		        "value": leadData.password?leadData.password:"",
		        "name": "password",
		        "language": null
		      },
		      {
		        "type": "input",
		        "value": leadData.image,
		        "name": "image",
		        "language": null
		      }
		    ],
		    "className": "user1",
		    "id": leadData.oo_id?leadData.oo_id:0,
		    "parentId": 31,
		    "key": leadData.FirstName+leadData.userRoleObject.id+leadData.email,
		    "published": true,
		    "type": "object",
		    "userOwner": 2,
		    "properties": null
		  };
		
		return data;
	}
}