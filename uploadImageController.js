
const fs = require('fs');

function loadImages (){
    try{
        const dataBuffer = fs.readFileSync('imagesFiles.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}
function upploadImage(req, res, err){
    console.log("req in upload image===========",req.body)
    try{
        // to load
        let imageFileData = loadImages()
        console.log("imageFileData from JSON===========",imageFileData)
        let dataToStore = JSON.stringify(req.body)
        console.log("dataToStore in json===========",dataToStore)
        //to save 
        imageFileData.push({
            imageData : dataToStore
        })
        console.log("imageFileData Updated===========",imageFileData)
        imageFileData = JSON.stringify(imageFileData)
        fs.writeFileSync('imagesFiles.json',imageFileData)
        return res.status(200).json({
            data: res
        })
    }catch(e){
        console.log("error in uploading",e)
        return res.status(200).json({
            data: null
        })
    }
  
}
function getImages(req, res, err){
    try{
        const dataBuffer = fs.readFileSync('imagesFiles.json')
        const dataJson = dataBuffer.toString()
        let data = JSON.parse(dataJson)
        return res.status(200).json({
            data: data
        })
    }catch(e){
        console.log("e=====",e)
        return []
    }
}
module.exports = {
    upploadImage,
    getImages
}
