module.exports = {

	_getJsonDataFromResObject(ObjectData) {
		var obj = {};
		obj['o_creationDate'] = ObjectData.creationDate
		obj['oo_id'] = ObjectData.id
		obj['AccountId'] = ObjectData.elements[2].value[0].id
		obj['ProjectId'] = ObjectData.elements[1].value[0].id
		obj['ResourceId'] = ObjectData.elements[0].value[0].id
		obj['Allocation']=ObjectData.elements[5].value
		obj['Role']=ObjectData.elements[6].value
		//console.log('ObjectData',ObjectData)
		ObjectData.elements.map((result, index) => {
			if (result.name == 'ResourceName') {
				obj[result.name] = result.value[0].id;
			} else if (result.name == 'ProjectName') {
				obj[result.name] = result.value[0].id;
			} else if (result.name == 'AccountName') {
				obj[result.name] = result.value[0].id;
			}
		})

		return obj
	},


	_getJsonDataFromResourceObject(ObjectData) {
		var obj = {};
		ObjectData.elements.map((result, index) => {
			if (result.name == 'ResourceName' || result.name == 'ProjectName')
				obj[result.name] = result.value;

			else if (result.name == 'CompanyName')
				obj['AccountName'] = result.value;
		})
		return obj
	},
}