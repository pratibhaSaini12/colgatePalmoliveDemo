module.exports = {

	_getJsonDataFromResourcesState(resourcesData){
		console.log('resourcesData--',resourcesData)
	 	
	var data={
		 "userModification":2,
		 "id": resourcesData.oo_id==''?0:parseInt(resourcesData.oo_id),
		 "className":"resourceNew",
		 "parentId":12,
		 "key":resourcesData.ResourceName+"_"+new Date(),
		 "published":true,
		 "type":"object",
		 "userOwner":2,
		 "properties":null,
		 "ResourceName":resourcesData.ResourceName,
		 "Designation":resourcesData.Designation,
		 "Role":resourcesData.Role,
		 "email":resourcesData.email,
		 "PrimarySkill":resourcesData.PrimarySkill,
		 "SecondrySkills":resourcesData.SecondrySkills,
		 "Comment":resourcesData.Comment,
		 "ResourceImage": resourcesData.ResourceImage,
		 "ActiveStatus":resourcesData.ActiveStatus
      }
      
         return data
	},      
}