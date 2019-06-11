const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const path = require('path')
var cron = require('node-cron');
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata.readonly'];


    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = 'token.json';


// If modifying these scopes, delete token.json.
getImage = () =>{

    // Load client secrets from a local file.
    fs.exists('credentials.json',(isFind)=>{console.log(isFind)})
    fs.readFile(path.resolve(__dirname, "credentials.json"), (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(JSON.parse(content), listFiles);
    });

}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
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
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth});
  var fileId = '1h8alBKaKW7muNNG9T-9b79ButOVRMEHo';
// q="'{{FOLDER_ID}}' in parents"
  drive.files.list(q="'{{FOLDER_ID}}' in parents").then(list=>{console.log('',list.data.files)
  list.data.files.map(file=>{
    console.log('##id',file)
    var dest = fs.createWriteStream(path.resolve(__dirname,'./googleImage/'+file.name));
 
     drive.files.get({fileId: file.id, alt: 'media'}, {responseType: 'stream'},
     async function(err, res){
       await res.data
       .on('end', () => {
          console.log('Done');
       })
       .on('error', err => {
          console.log('Error', err);
       })
       .pipe(dest);
    });
  })
  })
  .catch(err=>console.log('eror',err))

    function download(fileId, name, done) {
      const dest = fs.createWriteStream(name + '.csv');
      drive.files.export({
          fileId: fileId,
          mimeType: 'text/csv'
      }, {
          responseType: 'stream'
      },function(err, response){
          if(err)return done(err);
          
          response.data.on('error', err => {
              done(err);
          }).on('end', ()=>{
              done();
          })
          .pipe(dest);
     });
}


}

cron.schedule('*/1 * * * *', () => {
  console.log('running a task every two minutes');
  getImage()
});
// getImage();

// module.exports={getImage}