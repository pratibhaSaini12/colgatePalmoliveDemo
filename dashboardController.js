var con = require('./config.js');
var moment = require('moment');
var csv = require('fast-csv');
var mkdirp = require('mkdirp');
var fs = require('file-system');
var axios = require('axios');
const csvFile =require('csvtojson')

const reportFilePath = __dirname + '/../'
module.exports = {

    reportList(req, res) {
        var table = req.body.object;

        if (!(table == undefined)) {
            if (table.trim() == 'object_query_28' || table.trim() == 'object_query_27') {
                con.query("select * from " + table + " where   ActiveStatus=1 ", function(err, result) {
                    if (err)
                        throw err;
                    else {
                        return res.status(200).json({
                            reports: result
                        })
                    }
                })
            } else {
                con.query("select * from " + table + " where  ActiveStatus=1 ", function(err, result) {
                    if (err)
                        throw err;
                    else {
                        return res.status(200).json({
                            
                            reports: result

                        })
                    }
                })
            }
        } else {
            return res.status(200).json({
                reports: []
            })
        }
    }, 


    updateReport(req,res){
        
        var path = req.body.reportPath;
        var data = req.body.list;
        
        var dir = '';
        var folderName = '';
        var fileName = '';
        if(path!=undefined && path!=''){
            folderName = path.substring(1,path.lastIndexOf('/'));
            fileName = path.substring(path.lastIndexOf('/')+1);
        }
            var list = [];
            for (var k in data) {
                for(var index in data[k]){
                    delete  data[k]['ActiveStatus'];
                    delete  data[k]['oo_id'];
                    delete  data[k]['oo_classId'];
                    delete  data[k]['oo_className'];
                }
            }

           /* mkdirp(reportFilePath+folderName, function(err) { 
                 var createdFile = reportFilePath+folderName+'/'+fileName;
                var ws = fs.createWriteStream(createdFile);
                var leadCsvRes = csv.writeToStream(ws, data, {
                  headers: true,
                  quoteHeaders: true
                }).on("finish", function(){
                  csvFile()
              .fromFile(createdFile)
              .then((jsonObj)=>{
                  return res.status(200).json({
                  data:jsonObj,folder_name:folderName,fileName:fileName 
              })
              })
                });;
            });*/
            return res.status(200).json({
                  data:data,folder_name:folderName,fileName:fileName 
              })
           

        

        


    },

    updateField(req,res){
        var fieldName = req.body.field==''?'count':req.body.field;
        var userId = req.body.userId;
        var object = req.body.object;
        con.query("select * from  object_query_39 where userid='"+userId+"' AND object = '"+object+"'", function(err, result) {
            if(err) throw err;
                if(result!=undefined && result.length==0){
                    var query = "insert into object_query_39 (userid,field,object) values('"+userId+"','"+fieldName+"','"+object+"')";
                    con.query(query, function(err, result) {
                         return res.status(200).json({result:result})
                    })
                }
                else if(result!=undefined && result.length>0){
                    var query = "update  object_query_39  set field='"+fieldName+"' where userid='"+userId+"' AND object='"+object+"'";
                    con.query(query, function(err, result) {
                        if(err) throw err;
                         return res.status(200).json({result:result})
                    })
                }
        })
    },


/*    "INSERT INTO "+tableName+" (userid,field) SELECT * FROM (SELECT  '"+userId+"', '"+fieldName+"') AS tmp WHERE NOT EXISTS (SELECT name FROM "+tableName+" WHERE userid = '""') LIMIT 1"*/
 
    updateFilter(req,res){
        var userId = req.body.userId;
        var object = req.body.object;
        var filter = req.body.filter;
        con.query("select * from  object_query_39 where userid='"+userId+"' AND object = '"+object+"'", function(err, result) {
            if(err) throw err;
                if(result!=undefined && result.length==0){
                    var query = "insert into object_query_39 (userid,filter,object) values('"+userId+"','"+filter+"','"+object+"')";
                    con.query(query, function(err, result) {
                         return res.status(200).json({result:result})
                    })
                }
                else if(result!=undefined && result.length>0 ){
                    var query = "update  object_query_39  set filter='"+filter+"' where userid='"+userId+"' AND object='"+object+"'";
                    con.query(query, function(err, result) {
                        if(err) throw err;
                         return res.status(200).json({result:result})
                    })
                }
        })
    },
    updateFromDate(req,res){
        var userId = req.body.userId;
        var object = req.body.object;
        var fromDate = req.body.fromDate;
        var filter = req.body.filter;
        var toDate = req.body.toDate;
        var fieldName = req.body.field==''?'count':req.body.field;
        console.log("user is "+userId+" filter is "+filter);
        if(userId!=0 && object){
            con.query("select * from  object_query_39 where userid='"+userId+"' AND object = '"+object+"'", function(err, result) {
                if(err) throw err;
                    if(result!=undefined && result.length==0){
                        var query = "insert into object_query_39 (userid,fromdate,todate,field,filter,object) values('"+userId+"','"+fromDate+"','"+toDate+"','"+fieldName+"','"+filter+"','"+object+"')";
                        con.query(query, function(err, result) {
                             return res.status(200).json({result:result})
                        })
                    }
                    else if(result!=undefined && result.length>0 ){
                        console.log("updateeee ",filter)
                        var query = "update  object_query_39  set fromdate='"+fromDate+"',todate='"+toDate+"',field='"+fieldName+"',filter='"+filter+"',object='"+object+"' where userid='"+userId+"' AND object='"+object+"'";
                        con.query(query, function(err, result) {
                            if(err) throw err;
                             return res.status(200).json({result:result})
                        })
                    }
            })
        }
        else throw 'Not Found'

    }, 
    updateToDate(req,res){
        var userId = req.body.userId;
        var object = req.body.object;
        var toDate = req.body.toDate;
        con.query("select * from  object_query_39 where userid='"+userId+"' AND object = '"+object+"'", function(err, result) {
            if(err) throw err;
                if(result!=undefined && result.length==0){
                    var query = "insert into object_query_39 (userid,todate,object) values('"+userId+"','"+toDate+"','"+object+"')";
                    con.query(query, function(err, result) {
                         return res.status(200).json({result:result})
                    })
                }
                else if(result!=undefined && result.length>0 ){
                    var query = "update  object_query_39  set todate='"+toDate+"' where userid='"+userId+"' AND object='"+object+"'";
                    con.query(query, function(err, result) {
                        if(err) throw err;
                         return res.status(200).json({result:result})
                    })
                }
        })
    },

    getDashboardHistory(req,res){
        var object = req.body.object;
        var userId = req.body.userId;
        con.query("select * from object_query_39 where userid=? AND object=?",[userId,object], function(err, result) {
            if(err) throw err;
             return res.status(200).json({result:result})
        })


    }






};