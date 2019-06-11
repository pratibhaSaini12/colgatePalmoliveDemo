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
          tasks: result
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
          tasks: result
        })
      }
    })

  },

  //Create new task
  createNewTask(req, res) {
    console.log('data ===', req.body)
    con.query("INSERT INTO task (`assignedBy`, `assignedTo`, `subject`, `priority`,`status`,`due_date`) VALUES ('" + req.body.assignedBy + "', '" + req.body.assignedTo + "', '" + req.body.subject + "', '" + req.body.priority + "','" + req.body.status + "','" + req.body.due_date + "')", function (err, result) {
      console.log('response from create task====', result)
      if (err)
        throw err;
      else {

        return res.status(200).json({
          task: result
        })
      }
    })
  },

  getAllOpenTask(req, res) {
    console.log('inside controller')

    con.query("select assignedTo,count(*) as count from `task` where status='Open' Group By assignedTo", function (err, result) {
   console.log('response from DB====', result)
      if (err)
        throw err;
      else {

        return res.status(200).json({
          openTasks: result
        })
      }
    })
  },

  //Update new task
  updateTaskByID(req, res) {
    console.log("req.body=============", req.body)
    con.query("update `task` SET assignedBy=?,assignedTo=?,subject=?,priority=?,status=? where task_id=?", [req.body.assignedBy, req.body.assignedBy, req.body.assignedTo, req.body.subject, req.body.priority, req.body.status, req.body.task_id], function (err, result) {
      console.log('response from update====', result)
      if (err)
        throw err;
      else {

        return res.status(200).json({
          updatedTask: result
        })
      }
    })
  },

  //Get task by userID
  getTaskByTaskID(req, res) {
    con.query("SELECT * FROM `task` where task_id=?", [req.query.id], function (err, result) {
      console.log('response from get tasks by  task id----', result)
      if (err)
        throw err;
      else {

        return res.status(200).json({
          tasks: result
        })
      }
    })

  },

  getAllOpenTaskByUser(req, res) {
    console.log('inside controller')

    con.query("select * from `task` where status='Open' where assignedTo=?", [req.query.id], function (err, result) {
   console.log('response from DB====', result)
      if (err)
        throw err;
      else {

        return res.status(200).json({
          openTasks: result
        })
      }
    })
  },

};
