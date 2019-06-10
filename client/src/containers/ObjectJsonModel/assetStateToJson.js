module.exports = {

    _getJsonDataFromAsset(assetData) {
      var assetName = assetData.fileName.split(".")
      assetName[assetName.length - 2] = assetName[assetName.length - 2] + "_" + new Date().getTime()
      var name = assetName.join(".");
      console.log("Name - ", name)
      var data = {
        "data":
              { 
                  "data":assetData.base64,
                  "id": 0,
                  "parentId": 1,
                  "filename": name+"_"+new Date(),
                  "type":"document",
                  "path": "/",
                  "mimetype": assetData.mimetype,
                  "userOwner": "2", 
                  "userModification": "2",
                  "properties": null,
                  "customSettings":null,
                  "metadata": [],
                  "key": assetData.fileName+"_"+new Date(),
                  "checksum":
                   { 
                      "algo": "sha1",
                      "value": "2d6ccf543fd729b0ae1e3163f6a83a9eef5886cf" 
                   } 
               } 
  
           }
           return data
      },  
  
    _getJsonDataToSaveCSV(reportData){
      console.log('reportData--',reportData)
      var data={
        "data":
        {
          "data": reportData.base64,
          "id": 0,
          "parentId": reportData.folderId,
          "type": "text",
          "filename": reportData.filename + ".csv",
          "path": "/",
          "mimetype": "text/csv",
          "userOwner": "2",
          "userModification": "2",
          "properties": null,
          "customSettings": null,
          "metadata": [],
          "checksum": {
            "algo": "sha1",
            "value": "2d6ccf543fd729b0ae1e3163f6a83a9eef5886cf"
          }
        }
  
      }
      return data
    },
  
  
  
    _getJsonDataToUpdateCSV(reportData) {
      console.log('reportData--', reportData)
      var data = {
        "data":
        {
          "data": reportData.base64,
          "id": reportData.id,
          "mimetype": "text/csv",
          "userOwner": "2",
          "type": "text",
          "parentId": reportData.folderId,
          "filename":reportData.reportName +".csv",
          "userModification": "2",
          "properties": null,
          "customSettings": null,
          "metadata": [],
          "checksum": {
            "algo": "sha1",
            "value": "2d6ccf543fd729b0ae1e3163f6a83a9eef5886cf"
          }
        }
  
      }
      return data
    },
  }