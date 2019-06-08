module.exports = {

	_getJsonDataFromAttachment(attachmentData){
	 var data ={
    "path": "/ResourceRecords/",
    "userModification": 2,
    "childs": null,
    "elements": [
      {
        "type": "input",
        "value": attachmentData.ResourceName,
        "name": "ResourceName",
        "language": null
      },
      {
        "type": "input",
        "value": attachmentData.Designation,
        "name": "Designation",
        "language": null
      },
      {
        "type": "email",
        "value": attachmentData.email,
        "name": "email",
        "language": null
      },
      {
        "type": "input",
        "value": attachmentData.PrimarySkill,
        "name": "PrimarySkill",
        "language": null
      },
      {
        "type": "input",
        "value": attachmentData.Role,
        "name": "Role",
        "language": null
      },
      {
        "type": "input",
        "value": attachmentData.SecondrySkills,
        "name": "SecondrySkills",
        "language": null
      },
      {
        "type": "textarea",
        "value": attachmentData.Comment,
        "name": "Comment",
        "language": null
      },
      {
        "type": "href",
        "value": {
          "type": "asset",
          "subtype": 'image',
          "id": attachmentData.AssetId
        },
        "name": "ResourceImage",
        "language": null
      },
      {
        "type": "checkbox",
        "value": attachmentData.ActiveStatus,
        "name": "ActiveStatus",
        "language": null
      }
    ],
    "className": "resourceNew",
    "id": attachmentData.oo_id==''?0:attachmentData.oo_id,
    "parentId": 12,
    "key": attachmentData.ResourceName+'_'+new Date(),
    "published": true,
    "type": "object",
    "userOwner": 2,
    "properties": null
  }
         return data;
	}
}