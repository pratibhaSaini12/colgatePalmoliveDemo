var con = require('./config.js')
var md5 = require('md5');
var datetime = require('node-datetime');

module.exports = {

  //Get all tasks
  getAllTasks(req, res) {
    console.log('inside controller')

    con.query("SELECT * FROM `task` ", function (err, result) {
      //     console.log('response from DB====', result)
      if (err)
        throw err;
      else {

        return res.status(200).json({
          products: result
        })
      }
    })
  },

  //Get task by userID
  getTaskByUserID(req, res) {
    con.query("SELECT * FROM `task` where assignedTo=?", [req.query.id], function (err, result) {
      console.log('response from get tasks by  user id----', result)
      if (err)
        throw err;
      else {

        return res.status(200).json({
          product: result
        })
      }
    })

  },

  //Create new task
  createNewTask(req, res) {
    console.log('data ===', req.body)
    con.query("INSERT INTO task (`assignedBy`, `assignedTo`, `subject`, `priority`,`status`,`due_date`) VALUES ('" + req.body.assignedBy + "', '" + req.body.assignedTo + "', '" + req.body.subject + "', '" + req.body.priority + "','" + req.body.due_date + "')", function (err, result) {
      console.log('response from create task====', result)
      if (err)
        throw err;
      else {

        return res.status(200).json({
          product: result
        })
      }
    })
  }

};
