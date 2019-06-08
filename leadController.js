var con = require('./config.js')
var md5 = require('md5');
var datetime = require('node-datetime');

module.exports = {

  // method for fetching the all Active leads
  leadList(req, res) {

    con.query("SELECT * FROM `object_query_22` where ActiveStatus=1", function(err, result) {
      if (err)
        throw err;
      else {

        return res.status(200).json({
          leads: result
        })
      }
    })
  },
  getMyLeads(req, res) {
    console.log("Query------ ",req.query);
    con.query("SELECT * FROM `object_query_22` where ActiveStatus=? AND LeadOwner=?",[1,req.query.name], function(err, result) {
      if (err)
        throw err;
      else {

        return res.status(200).json({
          leads: result
        })
      }
    })
  },

  getCountryList(req, res) {
    con.query("SELECT * FROM `object_query_40`", function(err, result) {
      if (err)
        throw err;
      else {

        return res.status(200).json({
          country: result
        })
      }
    })
  },


 // AND RelatedToId="+req.query.Id + " AND RelatedToObject="+req.query.Object
  // method to fetching all the task list related to lead
  taskList(req, res) {
    console.log('req.query>>>>>>>>>>>>>>>>>>>>.',req.query);
    con.query("SELECT * FROM `object_query_31` where ActiveStatus=? AND RelatedToId=? AND RelatedToObject=?",[1,req.query.Id,req.query.Object],function(err, result) {
      if (err)
        throw err;
      else {
        console.log('resultt task>>>>>>>>>>>>..',result);
        return res.status(200).json({
          tasks: result
        })
      }
    })
  },

  getFields(req, res) {
    console.log('req.query>>>>>>>>>>>>>>>>>>>>.',req.query);
    con.query("SELECT * FROM `object_query_38` where FieldType=?" ,[req.query.fieldType],function(err, result) {
      if (err)
        throw err;
      else {

        console.log('resultt task>>>>>>>>>>>>..',result);
        return res.status(200).json({
          fieldList: result
        })
      }
    })
  },

  taskListFromOppIdList(req, res) {
    console.log('req.query>>>>>>>>>>>>>>>>>>>>.',req.query);
    con.query("SELECT * FROM `object_query_31` where ActiveStatus=1 AND RelatedToObject="+JSON.stringify(req.query.Object) ,function(err, result) {
      if (err)
        throw err;
      else {
        console.log('resultt>>>>>>>>>>>>..',result);
        return res.status(200).json({
          tasks: result
        })
      }
    })
  },

  // method for remove the lead on the basis of Id
  removeLeadList(req, res) {

    var pastDateTime = datetime.create(new Date());


    var deletedDate = pastDateTime.now();
    con.query("update `object_query_22` set ActiveStatus=?,o_deletionDate=? where oo_id=?", [0, deletedDate,req.query.oo_id], function(err, result) {
      if (err)
        throw err;
      else {
        con.query("update `object_query_31` set ActiveStatus=? where RelatedToId=? AND RelatedToObject=?", [0,req.query.oo_id,'Lead'], function(err, result) {
          if (err)
            throw err;
          else {

            return res.status(200).json({
              taskList: result
            })
          }
        })


      }
    })
  },

  // method to delete the lead on the basis of list of oo_id
  removeSelectedLead(req, res) {

      var pastDateTime = datetime.create(new Date());


      var deletedDate = pastDateTime.now();
      con.query("update `object_query_22` set ActiveStatus=?,o_deletionDate=? where oo_id IN (" + req.query.id + ")",[0,deletedDate],function(err, result)
      {
        if(err)
          throw err;
        else{

          con.query("update `object_query_31` set ActiveStatus=? where RelatedToId IN (" + req.query.id + ") AND RelatedToObject=?", [0,'Lead'], function(err, result) {
            if (err)
              throw err;
            else {

              return res.status(200).json({leads:result})
            }
          })


        }
      })
    },

  // method for edit/update the lead
  editLead(req, res) {

    var Salutation = req.body.Salutation;
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var Company = req.body.Company;
    var Title = req.body.Title;
    var OtherPhone = req.body.OtherPhone;
    var email = req.body.email;
    var Industry = req.body.Industry;
    var AnnualRevenue = req.body.AnnualRevenue;
    var Phone = req.body.Phone;
    var Mobile = req.body.Mobile;
    var Fax = req.body.Fax;
    var Website = req.body.Website;
    var LeadStatus = req.body.LeadStatus;
    var LeadSource = req.body.LeadSource;
    var NoOfEmployees = req.body.NoOfEmployees;
    var Street = req.body.Street;
    var City = req.body.City;
    var State = req.body.State;
    var Country = req.body.Country;
    var Zip = req.body.Zip;
    var ProductInterest = req.body.ProductInterest;
    var YearFounded = req.body.YearFounded;
    var NoOfLocation = req.body.NoOfLocation;
    var CurrentGenerator = req.body.CurrentGenerator;
    var Primary = req.body.Primary;
    var Description = req.body.Description;
    var Optional = req.body.Optional;
    var Priority = req.body.Priority;

    var pastDateTime = datetime.create(new Date());


    var deletedDate = pastDateTime.now();
    // var FirstName = req.body.FirstName
    con.query("update `object_query_22` SET Salutation= ?,FirstName= ?, LastName= ?, Company=?,Title= ?,OtherPhone= ?,email= ?,Industry= ?,AnnualRevenue= ?,Phone= ?,Mobile= ?,Fax= ? ,Website= ?, LeadStatus= ?,LeadSource= ?,Priority= ?,NoOfEmployees= ?,Street= ?,City= ?, State= ?,Country= ?,Zip= ?,ProductInterest= ?,YearFounded= ?,NoOfLocation= ?,CurrentGenerator= ?,PrimeList= ? ,Description=?,Optional=?,UpdatedDate=? where oo_id=?", [Salutation, FirstName, LastName, Company, Title, OtherPhone, email, Industry, AnnualRevenue, Phone, Mobile, Fax, Website, LeadStatus, LeadSource,Priority, NoOfEmployees, Street, City, State, Country, Zip, ProductInterest, YearFounded, NoOfLocation, CurrentGenerator, Primary, Description, Optional, deletedDate,req.body.oo_id], function(err, result) {
      if (err)
        throw err;
      else {

        return res.status(200).json({
          leads: result
        })
      }
    })
  },


  // method for create the lead
  createLead(req, res) {
    // var o_creationDate = getTime(req.body.o_creationDate)
    var past = req.body.o_creationDate;
    var pastDateTime = datetime.create(past);
    var pastNow;
    var o_creationDate;

    console.log("Desccccccc ----------------",req.body.Description);

    // get the current timestamp of the past
    pastNow = pastDateTime.now();
    // this would be 1420038010000
    o_creationDate = pastNow;
    con.query("INSERT INTO object_query_22 (`FirstName`, `LastName`, `Company`, `Phone`,`email`,`OtherPhone`,`o_creationDate`,`Salutation`,`Title`,`LeadSource`,`Industry`,`AnnualRevenue`,`Mobile`,`Fax`,`Website`,`LeadStatus`,`NoOfEmployees`,`Street`,`City`,`State`,`Zip`,`Country`,`ProductInterest`,`YearFounded`,`NoOfLocation`,`CurrentGenerator`,`PrimeList`,`Description`,`Optional`, `UpdatedDate`,`LeadOwner`,`CreatedBy`,`Priority`) VALUES ('" + req.body.FirstName + "', '" + req.body.LastName + "', '" + req.body.Company + "', '" + req.body.Phone + "','" + req.body.email + "','" + req.body.OtherPhone + "','" + o_creationDate + "','" + req.body.Salutation + "','" + req.body.Title + "','" + req.body.LeadSource + "','" + req.body.Industry + "','" + req.body.AnnualRevenue + "','" + req.body.Mobile + "','" + req.body.Fax + "','" + req.body.Website + "','" + req.body.LeadStatus + "','" + req.body.NoOfEmployees + "','" + req.body.Street + "','" + req.body.City + "','" + req.body.State + "','" + req.body.Zip + "','" + req.body.Country + "','" + req.body.ProductInterest + "','" + req.body.YearFounded + "','" + req.body.NoOfLocation + "','" + req.body.CurrentGenerator + "','" + req.body.Primary + "','" + req.body.Description + "','" + req.body.Optional + "','" + o_creationDate + "','" + req.body.LeadOwner + "','" + req.body.CreatedBy +"','"+req.body.Priority+"')", function(err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      req.body.oo_id= result.insertId
      return res.status(200).json({
        lead: req.body
      })
    });
    // });
  },

  // method for Restoring the lead and change Status
  restoreLead(req, res) {
    var currentDate = datetime.create(new Date);
    var updatedDate = currentDate.now();

    con.query("update `object_query_22` SET ActiveStatus=?,UpdatedDate=? where oo_id=" + req.body.oo_id, [1, updatedDate], function(err, result) {
      if (err)
        throw err;
      else {

        return res.status(200).json({
          lead: result
        })
      }
    })
  },


  // method for converting the lead
  convertLead(req, res) {
    // var o_creationDate = getTime(req.body.o_creationDate)
    var Company = req.body.Company;
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;




    // convert lead to account
    con.query("INSERT INTO object_query_23 (`AccountName`, `Phone`, `Website`, `ParentAccount`,`AccountNumber`,`AccountSite`,`Type`,`Industry`,`AnnualRevenue`,`Rating`,`Fax`,`TickerSymbol`,`Ownership`,`Employees`,`SicCode`,`BillingStreet`,`BillingCity`,`BillingState`,`BillingZip`,`BillingCountry`,`ShippingStreet`,`ShippingCity`,`ShippingState`,`ShippingZip`,`ShippingCountry`,`CustomPriority`,`SlaExpirationDate`,`NoOfLocation`,`Active`,`Sla`,`SlaSerialNumber`,`UpsellOpportunity`,`Description`,`CreatedBy`) VALUES ('" + req.body.Company + "', '', '', '','','','','','','','','','','','','','','','','','','','','','','','','','','','','','')", function(err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result

      //return res.status(200).json({lead:result})
    });


    // convert lead to contact
    con.query("INSERT INTO object_query_25 (`FirstName`, `LastName`, `Account`, `Phone`,`email`,`Salutation`,`Title`,`Department`,`BirthDate`,`ReportsTo`,`LeadSource`,`HomePhone`,`Mobile`,`OtherPhone`,`Fax`,`Assistant`,`AssistantPhone`,`MailingStreet`,`MailingCity`,`MailingState`,`MailingZip`,`MailingCountry`,`OtherStreet`,`OtherState`,`OtherZip`,`OtherCountry`,`Languages`,`Level`,`Description`) VALUES ('" + req.body.FirstName + "', '" + req.body.LastName + "', '', '','','','','','','','','','','','','','','','','','','','','','','','','','')", function(err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result

      // return res.status(200).json({lead:result})
    });

    // convert lead to opportunity
    con.query("INSERT INTO object_query_24 (`OpprtunityName`, `AccountName`, `CloseDate`, `Stage`,`Amount`,`Type`,`Private`,`LeadSource`,`Probability`,`PrimaryCampaign`,`OrderNumber`,`MainCompetitor`,`CurrentGenerator`,`DelieveryStatus`,`TrackingNumber`,`Description`) VALUES ('" + req.body.FirstName + "', '', '', '','','','','','','','','','','','','')", function(err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result

      //return res.status(200).json({lead:result})
    });
    // });
  },

  getLeadById(req, res) {
    con.query("SELECT * FROM `object_query_22` where ActiveStatus=1 AND oo_id=" + req.query.oo_id, function(err, result) {
      if (err)
        throw err;
      else {
         console.log('sssss-- ',result);
        return res.status(200).json({
          lead: result
        })
      }
    })
  },
};
