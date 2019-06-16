var con = require('./config.js');
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
    
    if (!fs.existsSync('client/public/asset/product/')){
        fs.mkdirSync('client/public/asset/product/');
    }
    if (!fs.existsSync('client/public/asset/product//main-image/')){
        fs.mkdirSync('client/public/asset/product/main-image/');
    }
    var imageFile = req.files.file;
    imageFile.mv(`client/public/asset/product/main-image/${req.body.filename}`, function(err) {
        if (err) {
            throw err;
        }
        const stats = fs.statSync(`client/public/asset/product/main-image/${req.body.filename}`);
        const fileSizeInBytes = stats.size;
        const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
        con.query("INSERT INTO assets (`asset_name`,`path`,`asset_type`,`size`,`created_by` ) VALUES ('" + imageFile.name + "', '" + "/public/asset/product/main-image/"+imageFile.name+ "', '" +imageFile.mimetype + "', '" +fileSizeInMegabytes + "','" +req.body.username + "')", function (err, result) {
            console.log('response from create Product====', result)
            if (err)
                return err;
            else {
                return res.status(200).json({
                    id:result.insertId,
                    path:`client/public/asset/product/main-image/${req.body.filename}`
                })
            }
        })
    });
  
}
function additionalImage (req, res, err){
    if (!fs.existsSync('client/public/asset/product/')){
        fs.mkdirSync('client/public/asset/product/');
    }
    if (!fs.existsSync('client/public/asset/product/additional/')){
        fs.mkdirSync('client/public/asset/product/additional/');
    }
    var imageFile = req.files.file;
    imageFile.mv(`client/public/asset/product/additional/${req.body.filename}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        const stats = fs.statSync(`client/public/asset/product/additional/${req.body.filename}`);
        const fileSizeInBytes = stats.size;
        const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
        con.query("INSERT INTO assets (`asset_name`,`path`,`asset_type`,`size`,`created_by` ) VALUES ('" + imageFile.name + "', '" + "/public/asset/product/additional/"+imageFile.name+ "', '" +imageFile.mimetype + "', '" +fileSizeInMegabytes + "','" +req.body.username + "')", function (err, result) {
            console.log('response from create Product====', result)
            if (err)
                return err;
            else {
                return res.status(200).json({
                    id:result.insertId,
                    path:`client/public/asset/product/additional/${req.body.filename}`
                })
            }
        })
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
