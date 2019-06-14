var con = require('./config.js')
var md5 = require('md5');
var datetime = require('node-datetime');
const fs = require('fs');
const image2base64 = require('image-to-base64');
const AssetJsonModel = require('./client/src/ObjectJsonModel/assetStateToJson')
const GetCronConntroller = require('./CRON/cronController');
const path = require('path')
var base64Img = require('base64-img')

function loadAssets() {
    try {
        const dataBuffer = fs.readFileSync('assetFilesJson.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}
function upploadAsset(req, res, err) {
    console.log("req in upload Assets===========", req.body)
    try {
        // to load
        let assetsFileData = loadAssets()
        console.log("assetsFileData from JSON===========", assetsFileData)
        let dataToStore = JSON.stringify(req.body)
        console.log("dataToStore in json===========", dataToStore)
        //to save 
        assetsFileData.push({
            assetData: dataToStore
        })
        console.log("assetsFileData Updated===========", assetsFileData)
        assetsFileData = JSON.stringify(assetsFileData)
        fs.writeFileSync('assetsFiles.json', assetsFileData)
        return res.status(200).json({
            data: res
        })
    } catch (e) {
        console.log("error in uploading", e)
        return res.status(200).json({
            data: null
        })
    }

}
function getAssets(req, res, err) {
    try {
        const dataBuffer = fs.readFileSync('assetFilesJson.json')
        const dataJson = dataBuffer.toString()
        let data = JSON.parse(dataJson)
        return res.status(200).json({
            data: data
        })
    } catch (e) {
        console.log("e=====", e)
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

        if (!fs.existsSync('client/public/asset/digital-Image/')){
            fs.mkdirSync('client/public/asset/digital-Image/');
        }
        var imageFile = req.files.file;
        console.log('imageFile---------',imageFile);
        imageFile.mv(`client/public/asset/digital-Image/${imageFile.name}`, function(err) {
            if (err) {
                return res.status(500).send(err);
            }
            con.query("INSERT INTO assets (`asset_name`,`path`,`asset_type` ) VALUES ('" + imageFile.name + "', '" + "/public/asset/digital-Image/"+imageFile.name+ "', '" +imageFile.mimetype + "')", function (err, result) {
                console.log('response from create Product====', result)
                if(err)
                    return err;
                else {
                    return res.status(200).json({
                        asset: result
                    })
                }
            })
        });


        
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

    //Delete product by ID
    deleteAssetByID(req, res) {
        console.log('###############', req.body)
        con.query("DELETE from `assets` where asset_id=" + req.body.id, function (err, result) {
            console.log('response from delete by id====', result)
            if (err)
                throw err;
            else {

                return res.status(200).json({
                    asset: result
                })
            }
        })


    },

    createAssetThroughDriv(req, res) {
        //Get from Google Drive CRON
        let result = []
        try {
            const googleFolder = path.resolve(__dirname, './CRON/googleImage/');
            let DelQuery =  "DELETE FROM assets WHERE `is_drive` = '1'"
            con.query(DelQuery, function (err, resu) {
                if (err)
                {
                    console.log(err)
                  }
                  else
                  {
                      console.log('shashank');
                      console.log(resu);
                  }
                });
            

            fs.readdirSync(googleFolder).forEach((file) => {
              let filePath = googleFolder + "/" + file;
              console.log(filePath);
              image2base64(filePath) // you can also to use url
                .then(
                  (response) => {
                    let imageFileData = loadAssets()
                    let assetBodyData = AssetJsonModel._getJsonDataFromAsset({ base64: response, fileName: file, mimetype: file.split(".")[1] !== undefined ? file.split(".")[1] : '' })
                    let dataToStore = JSON.stringify(assetBodyData)
        
                    imageFileData.push({
                      imageData: dataToStore
                    })

                    imageFileData = JSON.stringify(imageFileData)

                    let type = file.split(".")[0] !== undefined ? file.split(".")[1] : 'jpg'
                    let asset_type = "image/" + type 
                  
                         // process.exit();
                          
                    //SELECT `asset_id` from assets where `is_drive` = '1' ;
                  //  " + response + "
                    let que = "INSERT INTO assets (`asset_name`,`asset_data`,`asset_type`,`is_drive` ) VALUES ('" + file.split(".")[0] + "', '" + response + "', '" + asset_type + "','1')"
                       let Query =  con.query(que, function (err, resu) {
                           console.log('INSERT');
                           console.log(resu);
                      if (err)
                      {
                          console.log(err)
                        }
                      else {
                          fs.writeFile('assetFilesJson.json', imageFileData,(err) => {
                            if (err) 
                            {console.log(err) }
                            result.push(resu)
                          })
                      }
                  })
                }
                )
                .catch(
                  (error) => {
                    console.log("error in readFiles 156", error); //Exepection error....
                  }
                )
            })









            console.log("result=========",result)
            return res.status(200).json({
                asset: assets,
                error: null
            })
        } catch (e) {
            console.log("error in readFiles try", e);
            res.status(200).json({
                asset: assets,
                error: e
            })
        }
    },

    //image handeling
    upploadAsset,
    getAssets
};