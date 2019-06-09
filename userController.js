var con = require('./config.js')
var md5 = require('md5');
var datetime = require('node-datetime');

module.exports = {

  //Get user details 
  getUserDetails(req, res) {

  },

  //Get All users
  getAllUsers(req, res) {

  },
  validateUser(req, res) {

  },

  // method to login the user
  loginData(req, res) {
    var password = req.body.password
 

    con.query('SELECT * FROM users WHERE email = ?', [req.body.email], function (err, result) {
      if (err) {
        console.log("error for connection is ", err);
        throw err
      }
      else {
        console.log("result ius ", result);
        if (result.length < 1) {
          return res.status(403).json({
            "error": true,
            "message": "User not found"
          });
        }
        else if (password != result[0].user_password) {
          return res.status(201).json({
            "error": true,
            "message": "Password mismatch"
          });
        }
        else {
          return res.status(200).json({
            "error": false,
            "message": "Success",
            "userData": result[0]
          });
        }

      }
    })

  }

      

  

};
