module.exports = {
_getJsonDataFromObject(ObjectData){
	 	var obj = {};
	 	obj['CreationDate']=ObjectData.creationDate
	 	obj['oo_id']=ObjectData.id
	 	ObjectData.elements.map((result,index)=>{
                 let name = result.name
                 let value = result.value
                 obj[name] = value;
              })
         return obj
	},
}
