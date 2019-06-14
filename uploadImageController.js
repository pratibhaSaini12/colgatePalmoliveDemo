
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
function loadadditionalImage () {
    try{
        const dataBuffer = fs.readFileSync('additionalImage.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}
function upploadImage(req, res, err){
    console.log("req in upload image===========",req.body)
    console.log("req in upload image===========",req.files.file)
    var imageFile = req.files.file;
    imageFile.mv(`file/product/main-image/${req.body.filename}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({file: `/product/main-image/${req.body.filename}`});
    });
  
}
function additionalImage (req, res, err){
    console.log("req in upload image===========",req.body)
    console.log("req in upload image===========",req.files.file)
    var imageFile = req.files.file;
    imageFile.mv(`file/product/additional/${req.body.filename}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({file: `/product/additional/${req.body.filename}`});
    });
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
function getAdditionalImage(req, res, err){
    try{
        const dataBuffer = fs.readFileSync('additionalImage.json')
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
    getImages,
    additionalImage,
    getAdditionalImage
}
