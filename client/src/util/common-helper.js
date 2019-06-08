// import React, { PropTypes } from 'react';
 const moment = require('moment');
 const axios = require('axios');
 const cookie = require('react-cookies');
 const {properties,dashboardReport} = require('../common/properties')
module.exports = {
	_getFormatedDate(dateString){
		let date = new Date(dateString),
			_returnDateString,
			d = date.getDate(),
			m = date.getMonth() + 1,
			y = date.getFullYear()
		return _returnDateString = (m <= 9 ? "0" + m : m) + "/" + (d <= 9 ? "0" + d : d) + "/" +  y.toString().substr(-2)
	},

  _getFormatedDateWithFullYear(dateString){
    let date = new Date(dateString),
      _returnDateString,
      d = date.getDate(),
      m = date.getMonth() + 1,
      y = date.getFullYear()
    return _returnDateString = (m <= 9 ? "0" + m : m) + "/" + (d <= 9 ? "0" + d : d) + "/" +  y.toString()
  },

	// method for sorting the lead list by creation date
	_getSortedLeadList(leadList){

		leadList.sort(function compare(a, b) {
			var dateA = new Date(a.UpdatedDate||a.CreationDate)
			var dateB = new Date(b.UpdatedDate||b.CreationDate)
			return dateB - dateA
		})


		return leadList
	},

	// method for filter the lead list on the basis of lead status, leadOwner
	_getFilteredLeadList(leadList,valueForFilter){
    var Key_value= valueForFilter.Key_value
    var search_key= valueForFilter.search_key
    var result= []
    if(valueForFilter.search_key=="LeadStatus"){
      leadList.find( (leadList) =>{
          if(leadList.LeadStatus === Key_value){
            result.push(leadList)
          }
      })
      return result
    }else{
        leadList.find( (leadList) =>{
            if(leadList.LeadOwner === Key_value){
              result.push(leadList)
            }
        })
      return result
    }
	},


	_getFilteredAccList(accList,valueForFilter){
    var Key_value= valueForFilter.Key_value
    var search_key= valueForFilter.search_key
    var result= []
    if(valueForFilter.search_key=="Industry"){
      accList.find( (accList) =>{
          if(accList.Industry === Key_value){
            result.push(accList)
          }
      })
      return result
    }
	},

	// method for filter the opportunity list on the basis of opportunity status, opportunityOwner
	_getFilteredOpportunityList(opportunityList,valueForFilter){
    var Key_value= valueForFilter.Key_value
    var search_key= valueForFilter.search_key
    console.log("List -- ",opportunityList);
    console.log("Key -- ",Key_value);
    console.log("Search -- ",search_key);
    var result= []
    if(valueForFilter.search_key=="Stage"){
      opportunityList.find( (opportunityList) =>{
          if(opportunityList.Stage === Key_value){
            result.push(opportunityList)
          }
      })
      return result
    }else{
        opportunityList.find( (opportunityList) =>{
            if(opportunityList.OpportunityOwner === Key_value){
              result.push(opportunityList)
            }
        })
      return result
    }
	},

//method for the thousand seprator for amount
  _getAmountCommaSeparator(amount){
  		if(amount){
			var parts = amount.toString().split(".");
		  	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		  	return parts.join(".");
	  	}
	  	else{
	  		return '';
	  	}
	},

  _getTaskData(oppId){
    let userData = cookie.load("userData")
    let token = userData?userData.token: null
    let UserId = userData?userData.user.oo_id: null
    axios.get("api/taskList?UserId="+UserId+"&Id="+oppId+"&Object=Opportunity").then((res)=>{
      if(res.status==200&& !res.data.error ){

        let taskList=res.data.tasks
        taskList.map((task,index,result)=>{
          var DueDate = _getFormatedDate(task.DueDate).toString()
          console.log("SSSSSSSS  -- "+moment().isBefore(new Date(DueDate)));
          if(moment().isBefore(new Date(DueDate)))
          {
              return true;
          }
        })

          return false
      }
    }).catch(function(e) {

      })
  },

	_getSortedRecentItemList(leadList){


		leadList.sort(function compare(a, b) {
			var dateA = new Date(a.UpdatedDate)
			var dateB = new Date(b.UpdatedDate)
			return dateB - dateA
		})


		return leadList
	},

	// method for sorting the account list by ID
	_getSortedAccountList(accountList){

		accountList.sort(function compare(a, b) {
			var idA = a.oo_id
			var idB = b.oo_id
			return idB - idA
		})

		return accountList
	},

	// method for sorting the lead list
	_getSortedLeadByListByKey(name, leadList){
		console.log('_getSortedLeadByListByKey clicked',leadList)
		switch(name) {
		case "FirstName":

			return leadList.sort(firstName,name)
		case "Company":
			return leadList.sort(company,name)
		case "email":
			return leadList.sort(email,name)
		case "LeadStatus":
			return leadList.sort(LeadStatus,name)
		case "o_creationDate":
			return leadList.sort(o_creationDate,name)
		case "Country":
			return leadList.sort(Country,name)
		default:
			return ""
		}

		return leadList.sort(compare)
		function firstName(a, b) {
			const genreA = a.FirstName.toUpperCase()
			const genreB = b.FirstName.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function company(a, b) {
			const genreA = a.Company.toUpperCase()
			const genreB = b.Company.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function email(a, b) {
			const genreA = a.email.toUpperCase()
			const genreB = b.email.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function LeadStatus(a, b) {
			const genreA = a.LeadStatus.toUpperCase()
			const genreB = b.LeadStatus.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function Country(a, b) {
			const genreA = a.Country.toUpperCase()
			const genreB = b.Country.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function o_creationDate(a, b) {
			var dateA = new Date(a.o_creationDate)
			var dateB = new Date(b.o_creationDate)
			return dateB - dateA
		}
	},


  // method for sorting the invoice list
	_getSortedInvoiceByListByKey(name, invoiceList){
		switch(name) {
		case "InvoiceNo":

			return invoiceList.sort(invoiceNo,name)
		case "Account":
			return invoiceList.sort(account,name)
		case "Month":
			return invoiceList.sort(month,name)
		case "Year":
			return invoiceList.sort(year,name)
		case "ProjectName":
			return invoiceList.sort(project,name)
		case "Amount":
			return invoiceList.sort(amount,name)
    case "Status":
  	  return invoiceList.sort(status,name)
		default:
			return ""
		}

		return invoiceList.sort(compare)
		function invoiceNo(a, b) {
			const genreA = a.InvoiceNo
			const genreB = b.InvoiceNo

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function account(a, b) {
			const genreA = a.Account.toUpperCase()
			const genreB = b.Account.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function month(a, b) {
			const genreA = a.Month.toUpperCase()
			const genreB = b.Month.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function year(a, b) {
			const genreA = a.Year
			const genreB = b.Year

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function project(a, b) {
			const genreA = a.ProjectName.toUpperCase()
			const genreB = b.ProjectName.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function amount(a, b) {
      const genreA = a.Amount
			const genreB = b.Amount

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

    function status(a, b) {
			const genreA = a.Status.toUpperCase()
			const genreB = b.Status.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}
	},


	// method for sorting the account list
	_getSortedAccountListByKey(name, accountList){
		switch(name) {
		case "AccountName":

			return accountList.sort(AccountName,name)
		case "AccountSite":
			return accountList.sort(AccountSite,name)
		case "BillingState":
			return accountList.sort(BillingState,name)
		case "Phone":
			return accountList.sort(Phone,name)
		case "o_creationDate":
			return accountList.sort(o_creationDate,name)
		default:
			return ""
		}

		function AccountName(a, b) {
			const genreA = a.AccountName.toUpperCase()
			const genreB = b.AccountName.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function AccountSite(a, b) {
			const genreA = a.AccountSite.toUpperCase()
			const genreB = b.AccountSite.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function BillingState(a, b) {
			const genreA = a.BillingState.toUpperCase()
			const genreB = b.BillingState.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function Phone(a, b) {
			const genreA = a.Phone.toUpperCase()
			const genreB = b.Phone.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}
	},

	// method for sorting the contact list
	_getSortedContactListByKey(name, contactList){
		switch(name) {
		case "FirstName":
			return contactList.sort(FirstName,name)
		case "Account":
			return contactList.sort(Account,name)
		case "Title":
			return contactList.sort(Title,name)
		case "Phone":
			return contactList.sort(Phone,name)
		case "email":
			return contactList.sort(email,name)
		default:
			return ""
		}

		function FirstName(a, b) {
			const genreA = a.FirstName.toUpperCase()
			const genreB = b.FirstName.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function Account(a, b) {
			const genreA = a.Account.toUpperCase()
			const genreB = b.Account.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function Title(a, b) {
			const genreA = a.Title.toUpperCase()
			const genreB = b.Title.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function Phone(a, b) {
			const genreA = a.Phone.toUpperCase()
			const genreB = b.Phone.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function email(a, b) {
			const genreA = a.email.toUpperCase()
			const genreB = b.email.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}
	},

	// method for sorting the opportunity list
	_getSortedByKey(name, dataList) {
			switch (name) {
				case "OpprtunityName":
					return dataList.sort(stringCompare, name)
				case "AccountName":
					return dataList.sort(stringCompare, name)
				case "Amount":
					return dataList.sort(numberCompare, name)
				case "CloseDate":
					return dataList.sort(dateCompare, name)
				case "Stage":
					return dataList.sort(stringCompare, name)
				case "OpportunityOwner":
					return dataList.sort(stringCompare, name)
				case "FirstName":
					return dataList.sort(stringCompare, name)
				case "Company":
					return dataList.sort(stringCompare, name)
				case "Country":
					return dataList.sort(stringCompare, name)
				case "email":
					return dataList.sort(stringCompare, name)
				case "LeadStatus":
					return dataList.sort(stringCompare, name)
				case "o_creationDate":
					return dataList.sort(dateCompare, name)
				case "LeadOwner":
					return dataList.sort(stringCompare, name)
				case "Industry":
					return dataList.sort(stringCompare, name)
				case "BillingState":
					return dataList.sort(stringCompare, name)
				case "Website":
					return dataList.sort(stringCompare, name)
				case "Title":
					return dataList.sort(stringCompare, name)
				case "Account":
					return dataList.sort(stringCompare, name)
				case "Phone":
					return dataList.sort(numberCompare, name)
				case "ReportName":
					return dataList.sort(stringCompare, name)
				case "ReportType":
					return dataList.sort(stringCompare, name)
				case "CreationDate":
					return dataList.sort(dateCompare, name)
				case "CreatedBy":
					return dataList.sort(stringCompare, name)
				case "ReportPath":
					return dataList.sort(stringCompare, name)
				case "ResourceName":
					return dataList.sort(stringCompare, name)
				case "StartDate":
					return dataList.sort(dateCompare, name)
				case "EndDate":
					return dataList.sort(dateCompare, name)
				case "startDate":
					return dataList.sort(dateCompare, name)
				case "endDate":
					return dataList.sort(dateCompare, name)
				case "Role":
					return dataList.sort(stringCompare, name)
				case "Allocation":
					return dataList.sort(numberCompare, name)
				case "DueDate":
					return dataList.sort(dateCompare, name)
				case "Subject":
					return dataList.sort(stringCompare, name)
				case "RelatedToObject":
					return dataList.sort(stringCompare, name)
				case "RelatedTo":
					return dataList.sort(stringCompare, name)
				case "AssignedName":
					return dataList.sort(stringCompare, name)
				case "UserName":
					return dataList.sort(stringCompare, name)
				case "Priority":
					return dataList.sort(stringCompare, name)
				case "Status":
					return dataList.sort(stringCompare, name)
				case "InvoiceNo":
					return dataList.sort(stringCompare, name)
				case "Month":
					return dataList.sort(stringCompare, name)
				case "Year":
					return dataList.sort(numberCompare, name)
				case "ProjectName":
					return dataList.sort(stringCompare, name)
				case "ActivityType":
					return dataList.sort(stringCompare, name)
				case "CallTo":
					return dataList.sort(stringCompare, name)
				case "Notes":
					return dataList.sort(stringCompare, name)
				case "ProjectManager":
					return dataList.sort(stringCompare, name)
				case "AttachmentName":
					return dataList.sort(stringCompare, name)
				case "LastName":
					return dataList.sort(stringCompare, name)
				case "Company Name":
					return dataList.sort(stringCompare, name)
				case "Year Founded":
					return dataList.sort(numberCompare, name)
				case "No Of Employees":
					return dataList.sort(numberCompare, name)
				case "Revenue Last Year":
					return dataList.sort(numberCompare, name)
				case "City":
					return dataList.sort(stringCompare, name)
				case "Country":
					return dataList.sort(stringCompare, name)
				case "State":
					return dataList.sort(stringCompare, name)
				case "Street":
					return dataList.sort(stringCompare, name)
				case "Zip/Postal code":
					return dataList.sort(stringCompare, name)
				case "First Name":
					return dataList.sort(stringCompare, name)
				case "Email":
					return dataList.sort(stringCompare, name)
				case "Lead Status":
					return dataList.sort(stringCompare, name)
				case "Last Name":
					return dataList.sort(stringCompare, name)
				case "Office Phone":
					return dataList.sort(numberCompare, name)
				case "Lead Source":
					return dataList.sort(stringCompare, name)
				case "Salutation":
					return dataList.sort(stringCompare, name)
				case "Owner Alias":
					return dataList.sort(stringCompare, name)
				case "Mobile Phone":
					return dataList.sort(numberCompare, name)
				case "Other Phone":
					return dataList.sort(numberCompare, name)
				case "Fax":
					return dataList.sort(numberCompare, name)
				case "Description/Notes":
					return dataList.sort(stringCompare, name)
				case "Opportunity Name":
					return dataList.sort(stringCompare, name)
				case "Sales Owner":
					return dataList.sort(stringCompare, name)
				case "Client Partner":
					return dataList.sort(stringCompare, name)
				case "Expected Close Date":
					return dataList.sort(dateCompare, name)
				case "Projected Amount":
					return dataList.sort(numberCompare, name)
				case "Probability":
					return dataList.sort(numberCompare, name)
				case "Lead Created":
					return dataList.sort(dateCompare, name)
				case "Contact Name":
					return dataList.sort(stringCompare, name)
				case "Account Name":
					return dataList.sort(stringCompare, name)
				case "Resource Name":
					return dataList.sort(stringCompare, name)
				case "Primary Skill":
					return dataList.sort(stringCompare, name)
				case "PrimarySkill":
					return dataList.sort(stringCompare, name)
				case "Comments":
					return dataList.sort(stringCompare, name)
				case "Designation":
					return dataList.sort(stringCompare, name)
				case "Project Name":
					return dataList.sort(stringCompare, name)
				case "Project Manager":
					return dataList.sort(stringCompare, name)
				case "Start Date":
					return dataList.sort(dateCompare, name)
				case "End Date":
					return dataList.sort(dateCompare, name)
				case "Technology":
					return dataList.sort(stringCompare, name)
				case "Type":
					return dataList.sort(stringCompare, name)
				case "Initial Project Cost":
					return dataList.sort(numberCompare, name)
				case "ActualProjectCost":
					return dataList.sort(numberCompare, name)
        		case "Total":
  					return dataList.sort(numberCompare, name)
				case "Invoice No":
					return dataList.sort(stringCompare, name)
				case "Created Date":
					return dataList.sort(dateCompare, name)
				case "LeadSource":
					return dataList.sort(stringCompare, name)
				case "BillingCountry":
					return dataList.sort(stringCompare, name)
				case "AccountOwner":
					return dataList.sort(stringCompare, name)
				case "MailingCountry":
					return dataList.sort(stringCompare, name)
				case "ContactOwner":
					return dataList.sort(stringCompare, name)
				case "OpportunityOwner":
					return dataList.sort(stringCompare, name)
				case "ShippingZip":
					return dataList.sort(stringCompare, name)
				case "ShippingCountry":
					return dataList.sort(stringCompare, name)
				case "Priority":
					return dataList.sort(stringCompare, name)

				default:
					return ""
			}
		function stringCompare(a, b) {
			const genreA = a[name]?a[name].toUpperCase():''
			const genreB = b[name]?b[name].toUpperCase():''

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function dateCompare(a, b) {
			var dateA = new Date(a[name])
			var dateB = new Date(b[name])
			return dateB - dateA
		}

		function numberCompare(a, b) {
			return a[name]-b[name];
		}


		/*function OpprtunityName(a, b) {
			const genreA = a.OpprtunityName.toUpperCase()
			const genreB = b.OpprtunityName.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function AccountName(a, b) {
			const genreA = a.AccountName.toUpperCase()
			const genreB = b.AccountName.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function Amount(a, b) {
			const genreA = a.Amount.toUpperCase()
			const genreB = b.Amount.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function CloseDate(a, b) {
			var dateA = new Date(a.CloseDate)
			var dateB = new Date(b.CloseDate)
			return dateB - dateA
		}

		function Stage(a, b) {
			const genreA = a.Stage.toUpperCase()
			const genreB = b.Stage.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}*/
	},

	// method for filtering report list
	_getFilteredReportList(modifedate,leadsList,eDateToCompare,filterBy,filterValue,condition){

		console.log('condition in _getFilteredReportList---',leadsList)
		if(leadsList!=undefined && leadsList!='' ){
		    var filtered;
		    if(eDateToCompare=='')
		      filtered = leadsList.filter(leads => modifedate <= leads.o_creationDate);

		    else if(filterBy!='' && filterValue!='' && condition=='equals')
		         filtered = leadsList.filter(leads => (leads.o_creationDate <= eDateToCompare) && (modifedate <= leads.o_creationDate) && (leads[filterBy]==filterValue));
		     else if(filterBy!='' && filterValue!='' && condition=='contains')
		     	 filtered = leadsList.filter(leads => (leads.o_creationDate <= eDateToCompare) && (modifedate <= leads.o_creationDate) && (leads[filterBy] ? leads[filterBy].toString().toLowerCase().includes(filterValue.toString().toLowerCase()) :false));
		  	    else
		      filtered = leadsList.filter(leads => (leads.o_creationDate <= eDateToCompare) && (modifedate <= leads.o_creationDate));
		    return filtered;
		}
		else
			return []
  },

  _getFilteredProReportList(modifedate,leadsList,eDateToCompare,filterBy,filterValue,condition){

  		console.log('condition in _getFilteredProReportList---',condition)
	    var filtered
	    if(eDateToCompare=='')
	      filtered = leadsList.filter(leads => modifedate <= leads.o_creationDate);
	    else if(filterBy!='' && filterValue!='' && condition=='equals')
	         filtered = leadsList.filter(leads => (leads.o_creationDate <= eDateToCompare) && (modifedate <= leads.o_creationDate) && (leads[filterBy]==filterValue));
	    else if(filterBy!='' && filterValue!='' && condition=='contains')
	     	 filtered = leadsList.filter(leads => (leads.o_creationDate <= eDateToCompare) && (modifedate <= leads.o_creationDate) && (leads[filterBy].toLowerCase().includes(filterValue.toLowerCase())));

	    else
	       filtered = leadsList.filter(leads => (leads.o_creationDate <= eDateToCompare) && (modifedate <= leads.o_creationDate));

	    return filtered;
  },



	// method for sorting the resourceAllocation list
	_getSortedResourceAllocationListByKey(name, resourceAllocationList){
		switch(name) {
		case "ResourceName":
			return resourceAllocationList.sort(ResourceName,name)
		case "ProjectName":
			return resourceAllocationList.sort(ProjectName,name)
		case "AccountName":
			return resourceAllocationList.sort(AccountName,name)
		case "Role":
			return resourceAllocationList.sort(Role,name)
		case "Allocation":
			return resourceAllocationList.sort(Allocation,name)
		case "StartDate":
			return resourceAllocationList.sort(StartDate,name)
		case "EndDate":
			return resourceAllocationList.sort(EndDate,name)
		default:
			return ""
		}

		function ResourceName(a, b) {
			const genreA = a.ResourceName.toUpperCase()
			const genreB = b.ResourceName.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function ProjectName(a, b) {
			const genreA = a.ProjectName.toUpperCase()
			const genreB = b.ProjectName.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function AccountName(a, b) {
			const genreA = a.AccountName.toUpperCase()
			const genreB = b.AccountName.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function Role(a, b) {
			const genreA = a.Role.toUpperCase()
			const genreB = b.Role.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function Allocation(a, b) {
			const genreA = a.Allocation.toUpperCase()
			const genreB = b.Allocation.toUpperCase()

			let comparison = 0
			if (genreA > genreB) {
				comparison = 1
			} else if (genreA < genreB) {
				comparison = -1
			}
			return comparison
		}

		function StartDate(a, b) {
			var dateA = new Date(a.StartDate)
			var dateB = new Date(b.StartDate)
			return dateB - dateA
		}

		function EndDate(a, b) {
			var dateA = new Date(a.EndDate)
			var dateB = new Date(b.EndDate)
			return dateB - dateA
		}
	},


  // method for sorting the resourceAllocation list
  _getSortedResourceAllocationListByKey(name, resourceAllocationList){
    switch(name) {
      case 'ResourceName':
        return resourceAllocationList.sort(ResourceName,name);
      case 'ProjectName':
        return resourceAllocationList.sort(ProjectName,name);
      case 'AccountName':
        return resourceAllocationList.sort(AccountName,name);
      case 'Role':
        return resourceAllocationList.sort(Role,name);
      case 'Allocation':
        return resourceAllocationList.sort(Allocation,name);
      case 'StartDate':
        return resourceAllocationList.sort(StartDate,name);
      case 'EndDate':
        return resourceAllocationList.sort(EndDate,name);
      default:
        return '';
    }

    function ResourceName(a, b) {
      const genreA = a.ResourceName.toUpperCase();
      const genreB = b.ResourceName.toUpperCase();

      let comparison = 0;
      if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
    }

    function ProjectName(a, b) {
      const genreA = a.ProjectName.toUpperCase();
      const genreB = b.ProjectName.toUpperCase();

      let comparison = 0;
      if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
    }

    function AccountName(a, b) {
      const genreA = a.AccountName.toUpperCase();
      const genreB = b.AccountName.toUpperCase();

      let comparison = 0;
      if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
    }

    function Role(a, b) {
      const genreA = a.Role.toUpperCase();
      const genreB = b.Role.toUpperCase();

      let comparison = 0;
      if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
    }

    function Allocation(a, b) {
      const genreA = a.Allocation.toUpperCase();
      const genreB = b.Allocation.toUpperCase();

      let comparison = 0;
      if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
    }

    function StartDate(a, b) {
      var dateA = new Date(a.StartDate);
      var dateB = new Date(b.StartDate);
      return dateB - dateA;
    }

    function EndDate(a, b) {
      var dateA = new Date(a.EndDate);
      var dateB = new Date(b.EndDate);
      return dateB - dateA;
    }
  },

  _getFilterList(list,fieldName,fromDate,toDate,filterValue) {
    var count = {};
    if(fieldName!='' && fieldName!='count'){
    list.filter(data=> {
    	var value = data[fieldName]?data[fieldName]:'Blank';
        if(fromDate<=data.o_creationDate && toDate>=data.o_creationDate){
          if (count.hasOwnProperty(value)) {
              var c = count[value];
              c++;
              count[value] = c;
          } else {
              count[value] = 1;
          };
      }
    });
  }

  else if(fieldName=='' || fieldName=='count'){
  	var date ='';
  	if(filterValue=='month')
  		date = moment(fromDate,'x').format('MMMM');
  	else if(filterValue=='quarter')
  		date = moment(fromDate,'x').format('MMM')+"-"+(moment(toDate,'x').format('MMM'));
  	else
  		date = moment(fromDate,'x').format("MM/DD/YYYY");
    list.filter(function(data, i) {

      if(fromDate<=data.o_creationDate && toDate>=data.o_creationDate){
        if (count.hasOwnProperty(date)) {
            var c = count[date];
            c++;
            count[date] = c;
        } else {
            count[date] = 1
        }
      }
    })
  }
    return count;
  },

    _getFilterListForOpportunityProject (list,fieldName,fromDate,toDate,filterValue) {
    var count = {};
    if(fieldName!='' && fieldName!='count'){
    list.filter(data=> {
    	var value = data[fieldName]?data[fieldName]:'Blank';
        if(fromDate<=data.UpdatedDate && toDate>=data.UpdatedDate){
          if (count.hasOwnProperty(value)) {
              var c = count[value];
              c++;
              count[value] = c;
          } else {
              count[value] = 1;
          };
      }
    });
  }
  else if(fieldName=='' || fieldName=='count'){
  	var date ='';
  	if(filterValue=='month')
  	date = moment(fromDate,'x').format('MMM');
 	 else if(filterValue=='quarter')
  		date = moment(fromDate,'x').format('MMM')+"-"+(moment(toDate,'x').format('MMM'));
  	else
  		date = moment(fromDate,'x').format("MM/DD/YYYY");
    list.filter(function(data, i) {
      if(fromDate<=data.UpdatedDate && toDate>=data.UpdatedDate){
        if (count.hasOwnProperty(date)) {
            var c = count[date];
            c++;
            count[date] = c;
        } else {
            count[date] = 1
        }
      }
    })
  }
    return count;
  },

  _getFilterListForReport (list,filter) {
      var fromDate = '';
      var toDate = '';
      if (filter == 'week') {
          fromDate = moment().startOf('isoWeek').toDate().getTime();
          toDate = moment().endOf('isoWeek').toDate().getTime();
      } else if (filter == 'month') {
          fromDate = moment().startOf('month').toDate().getTime();
          toDate = moment().endOf('month').toDate().getTime();
      }
      if(fromDate =='' || toDate == ''){
            return list;
      }
      else{
          var filtered = list.filter(data => (fromDate<=data.o_creationDate ) && (toDate>=data.o_creationDate));
          return filtered;
      }
  },

  _getFilterListForProjectOpp (list,filter) {
      var fromDate = '';
      var toDate = '';
      if (filter == 'week') {
          fromDate = moment().startOf('isoWeek').toDate().getTime();
          toDate = moment().endOf('isoWeek').toDate().getTime();
      } else if (filter == 'month') {
          fromDate = moment().startOf('month').toDate().getTime();
          toDate = moment().endOf('month').toDate().getTime();
      }
      if(fromDate =='' || toDate == ''){
            return list;
      }
      else{
          var filtered = list.filter(data => (fromDate<=data.UpdatedDate ) && (toDate>=data.UpdatedDate));
          return filtered;
      }
  },


   _getDashboardFilterList (list,fromDate,toDate) {
   	  if(list!=undefined){
	      if(fromDate =='' || toDate == ''){
	            return list;
	      }
	      else{
	          var filtered = list.filter(data => (fromDate<=data.o_creationDate ) && (toDate>=data.o_creationDate));
	          return filtered;
	      }
      }
	  else{
		return  [] ;
	  }
  },

   _getDashboardOppDashFilterList (list,fromDate,toDate) {
   		if(list !=undefined){
	      if(fromDate =='' || toDate == ''){
	            return list;
	      }
	      else{
	          var filtered = list.filter(data => (fromDate<=data.UpdatedDate ) && (toDate>=data.UpdatedDate));
	          return filtered;
	      }
  		}
  		else{
  			return  [] ;
  		}
  },

  sortList(fieldName,list){
  	if(list!=undefined && list.length>0){
  		var obj = list[list.length-2][fieldName];

  		var number = Number(obj)?"number":(moment(obj, "MM/DD/YYYY", true).isValid()?"date":"string");
  		if(number=='number'){
  			return list.sort(function(a,b){
  				return a[fieldName]-b[fieldName];
  			})
  		}
  		else if(number=='string'){
  			return list.sort(function(a,b){
  				if(a[fieldName]){
  					return a[fieldName].localeCompare(b[fieldName]);
  				}
  			})
  		}
  		else if(number=='date'){
  				return list.sort(function(a,b){
  					return moment.utc(moment(a[fieldName]).toDate().getTime()).diff(moment.utc(b[fieldName]).toDate().getTime())
  				})
  		}
  	}


  },

  sortListDesc(fieldName,list){
  	if(list!=undefined && list.length>0){
  		var obj = list[list.length-2][fieldName];

  		var number = Number(obj)?"number":(moment(obj, "MM/DD/YYYY", true).isValid()?"date":"string");
  		if(number=='number'){
  			return list.sort(function(a,b){
  				return b[fieldName]-a[fieldName];
  			})
  		}
  		else if(number=='string'){
  			return list.sort(function(a,b){
  				if(a[fieldName]){
  					return b[fieldName].localeCompare(a[fieldName]);
  				}
  			})
  		}
  		else if(number=='date'){
  				return list.sort(function(a,b){
  					return moment.utc(moment(b[fieldName]).toDate().getTime()).diff(moment.utc(a[fieldName]).toDate().getTime())
  				})
  		}
  	}


  },

  lableForDashboard(filter,startDate,endDate){
  		var label = '';
  		if(filter=='month')
        label = startDate?moment(startDate,'x').format('MMMM') : moment().format('MMMM');
      else if(filter=='quarter')
        label = (startDate?moment(startDate,'x').format('MMM') : moment().startOf('quarter').format('MMM'))+"-"+(endDate?moment(endDate,'x').format('MMM') : moment().endOf('quarter').format('MMM'));
      else if(filter=='week')
        label = startDate?moment(startDate,'x').startOf('isoWeek').format("MM/DD/YYYY") : moment().startOf('isoWeek').format("MM/DD/YYYY");


    	return  label;
  },

  headerFilterUsingLabel(labelList , objectName){
  	if(objectName){
	  	var header = properties[objectName].header;
	  	var filterHeader = [];
	  	labelList.map(obj=>{
	  		header.map(kv=>{
	  			if(kv.label==obj)
	  				filterHeader.push(kv);
	  		})
	  	})
	  	return filterHeader;
  	}
  	else
  		return [];
  },

  headerFilterUsingKey(keyList , objectName){
  	if(objectName){
	  	var header = properties[objectName].header;
	  	var filterHeader = [];
	  	keyList.map(obj=>{
	  		header.map(kv=>{
	  			if(kv.key==obj)
	  				filterHeader.push(kv);
	  		})
	  	})
	  	return filterHeader;
  	}
  	else
  		return [];
  },


  updateCookieTime(){
  	let userData = cookie.load("userData")
  	if(userData!=undefined)
  		cookie.save("userData", userData,{maxAge:600})
  }




}
