var mysql = require('mysql')
var Sequelize = require("sequelize");


//Setting up the config
sequelize = new Sequelize('project_database', 'pimcore', 'Pimcore@123', {
  host: '18.222.97.182',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var con = mysql.createConnection({
  host: "18.222.97.182",    // ip address of server running mysql
  user: "pimcore",    // user name to your mysql database
  password: "Pimcore@123",    // corresponding password
  database: "pimcore" // use the specified database
});

//Checking connection status

// sequelize.authenticate().then(function(err){
//
// })
//   .catch(function (err){
//
//   });


module.exports = con;


// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : '18.222.97.182',
//   user     : 'pimcore',
//   password : 'Pimcore@123',
//   database : 'project_database'
// });
//
// connection.connect();
//
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//
// });
//
// connection.end();
