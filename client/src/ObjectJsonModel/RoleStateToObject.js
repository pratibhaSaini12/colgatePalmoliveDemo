 module.exports = {
	_getJsonDataFromRoleState(roleState){
		var data = {
			"path": "/rolerecords/",
		    "userModification": 2,
		    "childs": null,
		    "elements": [
		      {
		        "type": "input",
		        "value": roleState.RoleName,
		        "name": "RoleName",
		        "language": null
		      },
		      {
		        "type": "checkbox",
		        "value": roleState.Lead,
		        "name": "Lead",
		        "language": null
		      },
		      {
		        "type": "checkbox",
		        "value": roleState.Account,
		        "name": "Account",
		        "language": null
		      },
		      {
		        "type": "checkbox",
		        "value": roleState.Account,
		        "name": "Contact",
		        "language": null
		      },
		      {
		        "type": "checkbox",
		        "value": roleState.Opportunity,
		        "name": "Opportunity",
		        "language": null
		      },
		      {
		        "type": "checkbox",
		        "value": roleState.Projects,
		        "name": "Projects",
		        "language": null
		      },
		      {
		        "type": "checkbox",
		        "value": roleState.Resource,
		        "name": "Resources",
		        "language": null
		      },
		      {
		        "type": "checkbox",
		        "value": roleState.Invoices,
		        "name": "Invoices",
		        "language": null
		      },
		      {
		        "type": "checkbox",
		        "value": roleState.Reports,
		        "name": "Reports",
		        "language": null
		      }
		    ],
		    "className": "role1",
		    "id": roleState.oo_id?roleState.oo_id:'',
		    "parentId": 18,
		    "key": roleState.RoleName,
		    "published": true,
		    "type": "object",
		    "userOwner": 2,
		    "properties": null
		};
		return data;
	}
}
