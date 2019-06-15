const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const path = require('path')
var assetController = require('./../assetController.js');
var con = require('./../config.js')
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata.readonly'];


// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './token.json';


// If modifying these scopes, delete token.json.
 function  getImage(name , callback) {
  // Load client secrets from a local file.
  fs.exists('credentials.json', (isFind) => { console.log(isFind) })
  fs.readFile(path.resolve(__dirname, "credentials.json"), (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    console.log("content >>>>", content)
    authorize( JSON.parse(content), function (data) {
      console.log("authorize data is  ",data);
       listFiles(name,data,function(test){
        console.log("list file result is ",test);
        callback(test);
      });
    });
  });

  // const content = fs.readFileSync(path.resolve(__dirname, "credentials.json"), 'utf8');
  // console.log("content><><", content)
  // authorize(JSON.parse(content), listFiles);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  console.log("credentials.web is ", credentials.web)
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    console.log("tokenpath is >>>>", token)
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
  /*const token = fs.readFileSync(TOKEN_PATH, 'utf8');
  console.log('content<<<', token);
  getAccessToken(oAuth2Client, callback);*/


}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err.message);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function compareFile(fileName, base64, callback) {
  var dataDuplicate;
  con.query("Select * from assets", function (err, result) {
    if (err)
      throw err;
    var flag = true;
    result.map((key) => {
      if (key.path) {
        var bitmap
        try {
          bitmap = fs.readFileSync('client' + key.path);
          var base64dataLocal = Buffer(bitmap).toString('base64');
          if (base64dataLocal == base64) {
            flag = false;
            dataDuplicate = key;
          }
        } catch (error) {
          console.log("error is >>>")
          callback(true);
        }
      }
    }
    )
    if (flag) {
      callback(true);
    } else {
      callback(false);
    }

  }
  )
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
 function listFiles(name , auth, callback) {
  const drive = google.drive({ version: 'v3', auth });
  var fileId = '1h8alBKaKW7muNNG9T-9b79ButOVRMEHo';
  var imagesMIME = 'image';
  // q="'{{FOLDER_ID}}' in parents"
  drive.files.list(q = "'{{FOLDER_ID}}' in parents").then(list => {
    var i = 0;
    list.data.files.map(file => {
      i++;
      if (file.mimeType.startsWith('image')) {
        var isExist = fs.existsSync(path.resolve(__dirname, '../client/public/asset/digital-Image/' + file.name));
        var dest = fs.createWriteStream(path.resolve(__dirname, '../client/public/asset/digital-Image/' + file.name));
        drive.files.get({ fileId: file.id, alt: 'media' }, { responseType: 'stream' },
           function (err, res) {
            if (res !== undefined) {
              res.data
                .on('end', () => {
                  var data = { name: file.name, mimetype: file.mimeType };
                  try {
                    /*
                    const file = fs.readFileSync(res.data._readableState.pipes.path);
                    var base64 = Buffer.from(file).toString('base64')
                    var isExist = compareFile(data.name, base64, function (data) {
                      console.log("exist  is ", data);
                    });*/
                    //  console.log("fileSizeInBytes is ", base64)
                    const stats = fs.statSync(res.data._readableState.pipes.path);
                    const fileSizeInBytes = stats.size / (1024 * 1024);
                    console.log(" file >>>> ", res.data._readableState.pipes.path, " is ", isExist);
                    if (!isExist) {
                      con.query("INSERT INTO assets (`asset_name`,`path`,`asset_type`,`size` ,`created_by`) VALUES ('" + data.name + "', '" + "/public/asset/digital-Image/" + data.name + "', '" + data.mimetype + "','" + fileSizeInBytes + "','" + name + "')", function (err, result) {
                      })
                    }
                    console.log('Done');
                    console.log("list.data.files.length is ",list.data.files.length, "i is ",i)
                    if (i == list.data.files.length) {
                      console.log("exit from listfile");
                      callback(true);
                    }
                  } catch (e) {
                    //console.log("error is ", e);
                  }
                })
                .on('error', err => {
                  console.log('Error', err);
                })
                .pipe(dest);
            }
          });
      }
    })
  })
    .catch(err => {
      console.log('eror', err.response.data);
      console.log("exit from listfile with error ");
      callback(false);
    })

  /* function download(fileId, name, done) {
     const dest = fs.createWriteStream(name + '.csv');
     drive.files.export({
       fileId: fileId,
       mimeType: 'text/csv'
     }, {
         responseType: 'stream'
       }, function (err, response) {
         if (err) return done(err);
 
         response.data.on('error', err => {
           done(err);
         }).on('end', () => {
           done();
         })
           .pipe(dest);
       });
   }*/


}

//read google folder
// const readFiles =  () => {
//   try {
//     var idCardBase64
//     var assetBodyData
//     const googleFolder = path.resolve(__dirname, './googleImage/');
//     fs.readdirSync(googleFolder).forEach((file) => {
//       console.log("file====", file);
//       let filePath = googleFolder + "\\" + file
//       image2base64(filePath) // you can also to use url
//         .then(
//           (response) => {
//             console.log("path is: ", filePath)
//             let imageFileData = loadAssets()
//             let assetBodyData = AssetJsonModel._getJsonDataFromAsset({ base64: response, fileName: file, mimetype: file.split(".")[1] !== undefined ? file.split(".")[1] : '' })
//             let dataToStore = JSON.stringify(assetBodyData)

//             imageFileData.push({
//               imageData: dataToStore
//             })
//             imageFileData = JSON.stringify(imageFileData)


//             console.log("hitting aPI+++++++++++++++++++++")

//             let type = file.split(".")[0] !== undefined ? file.split(".")[1] : ''
//             let asset_type = "image/" + type
//             let que = `INSERT INTO assets ('asset_id',asset_name','asset_data','asset_type' ) VALUES (100,'${file.split(".")[0]}', '${response}', '${asset_type}')`
//             console.log("que=========",que)
//             con.query(que, function (err, result) {
//               console.log('response from create Product====',)
//               if (err)
//                   throw err;
//               else {
//                   console.log("Asset Saved in DB Done.....")
//                   console.log("assetObj on submit", file)
//                   fs.writeFile('assetFilesJson.json', imageFileData,(err) => {
//                     if (err) throw err;
//                     console.log('Saved! in JSON', file);


//                     // file deletion
//                     // fs.unlink(filePath, (err) => {
//                     //   if (err) throw err;
//                     //   console.log(filePath +' was deleted');
//                     // });
//                   })
//               }
//           })



//             // let assetObj = {
//             //   asset_name: file,
//             //   asset_data: response,
//             //   asset_type: file.split(".")[1] !== undefined ? file.split(".")[1] : ''
//             // }
//             // axios.post("http://localhost:3000/api/createNewAsset", assetObj).then((resp) => {
//             //   console.log("Axios worked..............")
//             //     if (resp.data.asset) {
//             //       console.log("Asset Saved in DB Done.....")
//             //     } else {
//             //       console.log("resposne eror submitAssets==")
//             //     }
//             //   }).catch((error) => {
//             //     console.log("error=========in cron AXIOS", error)
//             //   })


//           }
//         )
//         .catch(
//           (error) => {
//             console.log("error in readFiles 156", error); //Exepection error....
//             return
//           }
//         )
//     })
//   } catch (e) {
//     console.log("error in readFiles try", e);
//   }

// }
// //fetch image and turn in to base64
// //store in other file XYZ.json
// //then delete that image file

// const loadAssets = () => {
//   try {
//     const dataBuffer = fs.readFileSync('assetFilesJson.json')
//     const dataJson = dataBuffer.toString()
//     return JSON.parse(dataJson)
//   } catch (e) {
//     return []
//   }
// }



module.exports = {
  getData(req, res) {
    var name = req.query.name;
    console.log("anme si ",name);
   getImage(name , function(data){
    return res.status(200).json({
      success: data
  })
    });
  }
}
//getImage();
//getImage();

// module.exports={getImage}
