var con = require('./config.js')
var md5 = require('md5');
var datetime = require('node-datetime');
const fs = require('fs');

function loadAssets (){
    try{
        const dataBuffer = fs.readFileSync('assetsFiles.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch(e){
        return []
    }
}
function upploadAsset(req, res, err){
    console.log("req in upload Assets===========",req.body)
    try{
        // to load
        let assetsFileData = loadAssets()
        console.log("assetsFileData from JSON===========",assetsFileData)
        let dataToStore = JSON.stringify(req.body)
        console.log("dataToStore in json===========",dataToStore)
        //to save 
        assetsFileData.push({
            assetData : dataToStore
        })
        console.log("assetsFileData Updated===========",assetsFileData)
        assetsFileData = JSON.stringify(assetsFileData)
        fs.writeFileSync('assetsFiles.json',assetsFileData)
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
function getAssets(req, res, err){
    try{
        const dataBuffer = fs.readFileSync('assetsFiles.json')
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

    //Get all the product images
    getAllImages(req, res) {


    },

    //Get all the documents
    getAllDocuments(req, res) {

    },

    //Update asset by ID
    updateAsset(req, res) {

    },

    //Delete asset by ID
    deleteAsset(req, res) {

    },

    //Create new Asset 
    createNewAsset(req, res) {
        con.query("INSERT INTO assets (`asset_id`, `asset_name`,`asset_data`,`asset_type` ) VALUES ('" + req.body.asset_id + "', '" + req.body.asset_name + "', '" + req.body.asset_data + "', '" + req.body.asset_type + "')", function (err, result) {
            console.log('response from create Product====', result)
            if (err)
                throw err;
            else {

                return res.status(200).json({
                    asset: result
                })
            }
        })
    },

    getAssetList(req, res) {
        con.query("SELECT * FROM `assets` ", function (err, result) {
            if (err)
                throw err;
            else {
                return res.status(200).json({
                    assets: result
                })

            }
        })
    },


    getAssetByID(req, res) {
        console.log("Query------ ", req.query);
        con.query("SELECT * FROM `assets` where asset_id=?", [req.query.id], function (err, result) {
            console.log('response from get asset data by id----', result)
            if (err)
                throw err;
            else {

                return res.status(200).json({
                    asset: result
                })
            }
        })
    },

//image handeling
    upploadAsset,
    getAssets
};
