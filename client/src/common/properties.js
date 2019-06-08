module.exports  = { 
	properties  : {
  		Lead  :{
  			header : [ { key: 'FirstName', label: 'First Name' }, { key: 'Company', label: 'Company' }, { key: 'State', label: 'State' }, { key: 'email', label: 'Email' }, { key: 'LeadStatus', label: 'Lead Status' }, { key: 'o_creationDate', label: 'Creation Date' }, { key: 'Title', label: 'Title'}, { key: 'LastName', label: 'Last Name'},  { key: 'Industry', label: 'Industry'}, { key: 'Phone', label: 'Office Phone'}, { key: 'LeadSource', label: 'Lead Source'}, { key: 'Salutation', label: 'Salutation'}, { key: 'LeadOwner', label: 'Owner Alias'}, { key: 'Mobile', label: 'Mobile Phone'}, { key: 'OtherPhone', label: 'Other Phone'}, { key: 'Fax', label: 'Fax'}, { key: 'AnnualRevenue', label: 'Revenue Last Year'}, { key: 'Website', label: 'Website'}, { key: 'NoOfEmployees', label: 'No Of Employees'}, { key: 'Description', label: 'Description/Notes'}, { key: 'City', label: 'City'}, { key: 'Street', label: 'Street'}, { key: 'Zip', label: 'Zip/Postal Code'}, { key: 'Country', label: 'Country'},{key: 'Priority', label: 'Priority'} ],

  			filterField : [ { key: 'FirstName', label: 'First Name' }, { key: 'Company', label: 'Company' }, { key: 'State', label: 'State' }, { key: 'email', label: 'Email' }, { key: 'LeadStatus', label: 'Lead Status' }, { key: 'Title', label: 'Title'}, { key: 'LastName', label: 'Last Name'},  { key: 'Industry', label: 'Industry'}, { key: 'Phone', label: 'Office Phone'}, { key: 'LeadSource', label: 'Lead Source'}, { key: 'Salutation', label: 'Salutation'}, { key: 'LeadOwner', label: 'Owner Alias'}, { key: 'Mobile', label: 'Mobile Phone'}, { key: 'OtherPhone', label: 'Other Phone'}, { key: 'Fax', label: 'Fax'}, { key: 'AnnualRevenue', label: 'Revenue Last Year'}, { key: 'Website', label: 'Website'}, { key: 'NoOfEmployees', label: 'No Of Employees'}, { key: 'Description', label: 'Description/Notes'}, { key: 'City', label: 'City'}, { key: 'Street', label: 'Street'}, { key: 'Zip', label: 'Zip/Postal Code'}, { key: 'Country', label: 'Country'},{key: 'Priority', label: 'Priority'} ],

  			activeField : [ { key: 'FirstName', label: 'First Name' }, { key: 'Company', label: 'Company' }, { key: 'State', label: 'State' }, { key: 'email', label: 'Email' }, { key: 'LeadStatus', label: 'Lead Status' }, { key: 'o_creationDate', label: 'Creation Date' }, { key: 'LeadOwner', label: 'Owner Alias'}, ],

  			inactiveField : [ { key: 'Title', label: 'Title'}, { key: 'LastName', label: 'Last Name'}, { key: 'Industry', label: 'Industry'}, { key: 'Phone', label: 'Office Phone'}, { key: 'LeadSource', label: 'Lead Source'}, { key: 'Salutation', label: 'Salutation'}, { key: 'Mobile', label: 'Mobile Phone'}, { key: 'OtherPhone', label: 'Other Phone'}, { key: 'Fax', label: 'Fax'}, { key: 'AnnualRevenue', label: 'Revenue Last Year'}, { key: 'Website', label: 'Website'}, { key: 'NoOfEmployees', label: 'No Of Employees'}, { key: 'Description', label: 'Description/Notes'}, { key: 'City', label: 'City'}, { key: 'Street', label: 'Street'}, { key: 'Zip', label: 'Zip/Postal Code'}, { key: 'Country', label: 'Country'} ,{key: 'Priority', label: 'Priority'}],

         dashboardReportHeader :[{key : 'FirstName', label : 'Name'},{key : 'Company', label : 'Company'},{key : 'State',label : 'State'},{ key : 'email', label : 'Email'},{key : 'LeadStatus', label : 'Status'},{key : 'o_creationDate',label : 'Creation Date'}],

         filterDropdown : [ { ReportPath: '/lead/LeadByCount.csv', ReportName: 'Lead', title: 'Lead By Count', field: '' }, { ReportPath: '/lead/LeadBySource.csv', ReportName: 'Lead', title: 'Lead By Source', field: 'LeadSource' }, { ReportPath: '/lead/LeadByCountry.csv', ReportName: 'Lead', title: 'Lead By Country', field: 'Country' }, { ReportPath: '/lead/LeadBySalesOwner.csv', ReportName: 'Lead', title: 'Lead By Owner', field: 'LeadOwner' }],

          tableName : 'object_query_22',
                  



  		},
  		Account : {
  			header : [ { key: 'AccountName', label: 'Company Name' }, { key: 'Website', label: 'Website'}, { key: 'Industry', label: 'Industry' }, { key: 'YearFounded', label: 'Year Founded' }, { key: 'AnnualRevenue', label: 'Revenue Last Year' }, { key: 'Employees', label: 'No Of Employees' }, { key: 'BillingCity', label: 'City' }, { key: 'BillingCountry', label: 'Country' }, { key: 'BillingState', label: 'State' }, { key: 'BillingStreet', label: 'Street' }, { key: 'BillingZip', label: 'Zip/Postal code' }, ],

  			filterField : [ { key: 'AccountName', label: 'Company Name' }, { key: 'Website', label: 'Website'}, { key: 'Industry', label: 'Industry' }, { key: 'YearFounded', label: 'Year Founded' }, { key: 'AnnualRevenue', label: 'Revenue Last Year' }, { key: 'Employees', label: 'No Of Employees' }, { key: 'BillingCity', label: 'City' }, { key: 'BillingCountry', label: 'Country' }, { key: 'BillingState', label: 'State' }, { key: 'BillingStreet', label: 'Street' }, { key: 'BillingZip', label: 'Zip/Postal code' }, ],

  			activeField : [ { key: 'AccountName', label: 'Company Name' }, { key: 'Website', label: 'Website'}, { key: 'Industry', label: 'Industry' }, { key: 'YearFounded', label: 'Year Founded' }, { key: 'AnnualRevenue', label: 'Revenue Last Year' }, { key: 'Employees', label: 'No Of Employees' } ],

  			inactiveField : [ { key: 'BillingCity', label: 'City' }, { key: 'BillingCountry', label: 'Country' }, { key: 'BillingState', label: 'State' }, { key: 'BillingStreet', label: 'Street' }, { key: 'BillingZip', label: 'Zip/Postal code' }, ],

        dashboardReportHeader :  [{key : 'AccountName' , label : 'Company Name'},{key : 'Industry', label : 'Industry'},{key : 'Website', label : 'Website'}, {key : 'ShippingZip', label : 'Zip/Postal Code'},{key : 'ShippingCountry',label : 'Country'}],

        filterDropdown : [{ ReportPath: '/account/AccountByCount.csv', ReportName: 'Account', title: 'Account By Count', field: '' }, { ReportPath: '/account/AccountByCountry.csv', ReportName: 'Account', title: 'Account By Country', field: 'BillingCountry' }, { ReportPath: '/account/AccountBySalesOwner.csv', ReportName: 'Account', title: 'Account By Owner', field: 'AccountOwner' }],

        tableName : 'object_query_23',


  		},
  		Contact : {
  			header : [ { key: 'FirstName', label: 'First Name' }, { key: 'Account', label: 'Account' }, { key: 'Title', label: 'Title' }, { key: 'Phone', label: 'Office Phone' }, { key: 'email', label: 'Email' }, { key: 'Fax', label: 'Fax Number' }, { key: 'LastName', label: 'Last Name' }, { key: 'OtherPhone', label: 'Other Phone' }, { key: 'Mobile', label: 'Mobile Phone' }, { key: 'MailingCity', label: 'City' }, { key: 'MailingCountry', label: 'Country' }, { key: 'MailingState', label: 'State' }, { key: 'MailingStreet', label: 'Street' }, { key: 'MailingZip', label: 'Zip/Postal Code' }, ],

  			filterField : [ { key: 'FirstName', label: 'First Name' }, { key: 'Account', label: 'Account' }, { key: 'Title', label: 'Title' }, { key: 'Phone', label: 'Office Phone' }, { key: 'email', label: 'Email' }, { key: 'Fax', label: 'Fax Number' }, { key: 'LastName', label: 'Last Name' }, { key: 'OtherPhone', label: 'Other Phone' }, { key: 'Mobile', label: 'Mobile Phone' }, { key: 'MailingCity', label: 'City' }, { key: 'MailingCountry', label: 'Country' }, { key: 'MailingState', label: 'State' }, { key: 'MailingStreet', label: 'Street' }, { key: 'MailingZip', label: 'Zip/Postal Code' }, ],

  			activeField : [ { key: 'FirstName', label: 'First Name' }, { key: 'Account', label: 'Account' }, { key: 'Title', label: 'Title' }, { key: 'Phone', label: 'Office Phone' }, { key: 'email', label: 'Email' }, ],

  			inactiveField : [ { key: 'Fax', label: 'Fax Number' }, { key: 'LastName', label: 'Last Name' }, { key: 'OtherPhone', label: 'Other Phone' }, { key: 'Mobile', label: 'Mobile Phone' }, { key: 'MailingCity', label: 'City' }, { key: 'MailingCountry', label: 'Country' }, { key: 'MailingState', label: 'State' }, { key: 'MailingStreet', label: 'Street' }, { key: 'MailingZip', label: 'Zip/Postal Code' }, ],

        dashboardReportHeader : [{key : 'FirstName', label : 'Name' } , { key : 'Account', label 
         : 'Account' } , {key : 'Title', label : 'Title' } , {key : 'Phone',label:  'Phone' } , {key : 'email',label : 'Email' }],

         filterDropdown : [ { ReportPath: '/contact/ContactByCount.csv', ReportName: 'Contact', title: 'Contact By Count', field: '' },{ ReportPath: '/contact/ContactBySource.csv', ReportName: 'Contact', title: 'Contact By Source', field: 'LeadSource' }, { ReportPath: '/contact/ContactByCountry.csv', ReportName: 'Contact', title: 'Contact By Country', field: 'MailingCountry' }, { ReportPath: '/contact/ContactBySalesOwner.csv', ReportName: 'Contact', title: 'Contact By Owner', field: 'ContactOwner' }],

         tableName : 'object_query_25',




  		},
  		Opportunity : {
  			header : [ { key: 'OpprtunityName', label: 'Opportunity Name' }, { key: 'OpportunityOwner', label: 'Sales Owner' }, { key: 'AccountManager', label: 'Client Partner' }, { key: 'CloseDate', label: 'Expected Close Date' }, { key: 'Amount', label: 'Projected Amount' }, { key: 'Stage', label: 'Stage' }, { key: 'Status', label: 'Status' }, { key: 'Probability', label: 'Probability' }, { key: 'LeadSource', label: 'Lead Source' }, { key: 'o_creationDate', label: 'Lead Created' }, { key: 'Description', label: 'Description/Notes' }, { key: 'ContactName', label: 'Contact Name' }, { key: 'AccountName', label: 'Account Name' }, { key: 'City', label: 'City' }, { key: 'Country', label: 'Country' }, { key: 'State', label: 'State' }, { key: 'Street', label: 'Street' }, { key: 'Zip', label: 'Zip/Postal code' },{key: 'Priority', label: 'Priority'} ],

  			filterField : [ { key: 'OpprtunityName', label: 'Opportunity Name' }, { key: 'OpportunityOwner', label: 'Sales Owner' }, { key: 'AccountManager', label: 'Client Partner' }, { key: 'Amount', label: 'Projected Amount' }, { key: 'Stage', label: 'Stage' }, { key: 'Status', label: 'Status' }, { key: 'Probability', label: 'Probability' }, { key: 'LeadSource', label: 'Lead Source' },{ key: 'Description', label: 'Description/Notes' }, { key: 'ContactName', label: 'Contact Name' }, { key: 'AccountName', label: 'Account Name' }, { key: 'City', label: 'City' }, { key: 'Country', label: 'Country' }, { key: 'State', label: 'State' }, { key: 'Street', label: 'Street' }, { key: 'Zip', label: 'Zip/Postal code' },{key: 'Priority', label: 'Priority'} ],

  			activeField : [ { key: 'OpprtunityName', label: 'Opportunity Name' }, { key: 'OpportunityOwner', label: 'Sales Owner' }, { key: 'AccountManager', label: 'Client Partner' }, { key: 'CloseDate', label: 'Expected Close Date' }, { key: 'Amount', label: 'Projected Amount' }, { key: 'Stage', label: 'Stage' } ],

  			inactiveField : [ { key: 'Status', label: 'Status' }, { key: 'Probability', label: 'Probability' }, { key: 'LeadSource', label: 'Lead Source' }, { key: 'o_creationDate', label: 'Lead Created' }, { key: 'Description', label: 'Description/Notes' }, { key: 'ContactName', label: 'Contact Name' }, { key: 'AccountName', label: 'Account Name' }, { key: 'City', label: 'City' }, { key: 'Country', label: 'Country' }, { key: 'State', label: 'State' }, { key: 'Street', label: 'Street' }, { key: 'Zip', label: 'Zip/Postal code' },{key: 'Priority', label: 'Priority'} ],

        dashboardReportHeader : [{key : 'OpprtunityName', label : 'Opportunity Name'},{key : 'AccountName',label : 'Account Name'},{key : 'Amount',label : 'Amount'} , {key : 'CloseDate',label : 'Close Data'} , {key : 'Stage', label : 'Stage'} ],

       filterDropdown :  [ { ReportPath: '/opportunity/OpportunityByCount.csv', ReportName: 'Opportunity', title: 'Opportunity By Count', field: '' },{ ReportPath: '/opportunity/OpportunityBySource.csv', ReportName: 'Opportunity', title: 'Opportunity By Source', field: 'LeadSource' }, { ReportPath: '/opportunity/OpportunityByCountry.csv', ReportName: 'Opportunity', title: 'Opportunity By Country', field: 'Country' }, { ReportPath: '/opportunity/OpportunityBySalesOwner.csv', ReportName: 'Opportunity', title: 'Opportunity By Owner', field: 'OpportunityOwner' }],

       tableName : 'object_query_24',


  		},
  		Resource : {
  			header : [ { key: 'ResourceName', label: 'Resource Name' }, { key: 'Role', label: 'Role' }, { key: 'PrimarySkill', label: 'Primary Skill' }, { key: 'email', label: 'Email' }, { key: 'Comment', label: 'Comments' }, { key: 'Designation', label: 'Designation' } ],

  			filterField : [ { key: 'ResourceName', label: 'Resource Name' }, { key: 'Role', label: 'Role' }, { key: 'PrimarySkill', label: 'Primary Skill' }, { key: 'email', label: 'Email' }, { key: 'Comment', label: 'Comments' }, { key: 'Designation', label: 'Designation' } ],

  			activeField : [ { key: 'ResourceName', label: 'Resource Name' }, { key: 'Role', label: 'Role' }, { key: 'PrimarySkill', label: 'Primary Skill' }, { key: 'email', label: 'Email' }, ],

  			inactiveField : [ { key: 'Comment', label: 'Comments' }, { key: 'Designation', label: 'Designation' } ],

        dashboardReportHeader : [{key : 'ResourceName',label : 'Resource Name'} ,{key : 'Role',label : 'Role'} ,  {key : 'Designation',label : 'Designation'},{key : 'PrimarySkill',label : 'Skills'},{key : 'email',label : 'Email'}],

        filterDropdown :  [{ ReportPath: '/resources/ResourcesByCount.csv', ReportName: 'Resources', title: 'Resources By Count', field: '' }, { ReportPath: '/resources/ResourcesByRole.csv', ReportName: 'Resources', title: 'Resources By Role', field: 'Role' }, { ReportPath: '/resources/ResourcesByDesignation.csv', ReportName: 'Resources', title: 'Resources By Designation', field: 'Designation' }] , 

        tableName : 'object_query_28',




  		},
  		Project : {
  			header : [ { key: 'ProjectName', label: 'Project Name' }, { key: 'ProjectManager', label: 'Project Manager' }, { key: 'StartDate', label: 'Start Date' }, { key: 'EndDate', label: 'End Date' }, { key: 'Status', label: 'Status' }, { key: 'Technology', label: 'Technology' }, { key: 'Type', label: 'Type' }, { key: 'InitialProjectCost', label: 'Initial Project Cost' }, { key: 'ActualProjectCost', label: 'Actual Project Cost' },{key: 'Priority', label: 'Priority'},{key: 'ImplementedBy', label: 'Implemented By'} ],

  			filterField : [ { key: 'ProjectName', label: 'Project Name' }, { key: 'ProjectManager', label: 'Project Manager' }, { key: 'Status', label: 'Status' }, { key: 'Technology', label: 'Technology' }, { key: 'Type', label: 'Type' }, { key: 'InitialProjectCost', label: 'Initial Project Cost' }, { key: 'ActualProjectCost', label: 'Actual Project Cost' },{key: 'Priority', label: 'Priority'},{key: 'ImplementedBy', label: 'Implemented By'} ],

  			activeField : [ { key: 'ProjectName', label: 'Project Name' }, { key: 'ProjectManager', label: 'Project Manager' }, { key: 'StartDate', label: 'Start Date' }, { key: 'EndDate', label: 'End Date' }, { key: 'Status', label: 'Status' }, { key: 'Technology', label: 'Technology' } ] , 

  			inactiveField : [ { key: 'Type', label: 'Type' }, { key: 'InitialProjectCost', label: 'Initial Project Cost' }, { key: 'ActualProjectCost', label: 'Actual Project Cost' },{key: 'Priority', label: 'Priority'},{key: 'ImplementedBy', label: 'Implemented By'}],

        dashboardReportHeader : [{key : 'ProjectName',label : 'Project Name'} ,{key : 'ProjectManager',label : 'Project Manager'} ,{key : 'StartDate',label : 'Start Date'} , {key : 'EndDate',label : 'End Data'} ,{key : 'Status',label : 'Status'}],

        filterDropdown : [{ ReportPath: '/project/ProjectByCount.csv', ReportName: 'Project', title: 'Project By Count', field: '' }, { ReportPath: '/project/ProjectByManager.csv', ReportName: 'Project', title: 'Project By Manager', field: 'ProjectManager' }],
        
        tableName : 'object_query_27',


  		},
  		Invoice : {
  			header : [ { key: 'InvoiceNo', label: 'Invoice No' }, { key: 'ProjectName', label: 'Project Name' }, { key: 'Status', label: 'Status' }, { key: 'Account', label: 'Account' }, { key: 'Amount', label: 'Amount' }, { key: 'Month', label: 'Month' }, { key: 'Year', label: 'Year' }, { key: 'o_creationDate', label: 'Created Date' } ],

  			filterField : [ { key: 'InvoiceNo', label: 'Invoice No' }, { key: 'ProjectName', label: 'Project Name' }, { key: 'Status', label: 'Status' }, { key: 'Account', label: 'Account' }, { key: 'Amount', label: 'Amount' }, { key: 'Month', label: 'Month' }, { key: 'Year', label: 'Year' }],

  			activeField : [ { key: 'InvoiceNo', label: 'Invoice No' }, { key: 'ProjectName', label: 'Project Name' }, { key: 'Status', label: 'Status' }, { key: 'Account', label: 'Account' }, { key: 'Amount', label: 'Amount' }, ],

  			inactiveField : [ { key: 'Month', label: 'Month' }, { key: 'Year', label: 'Year' }, { key: 'o_creationDate', label: 'Created Date' } ],

        tableName : 'object_query_26',

  		}
  	},


  dashboardReport : {
       Lead : {LeadSource : 'Lead By Source', Country :  'Lead By Country' , LeadOwner : 'Lead By Owner'},
       Account : {BillingCountry: 'Account By Country' , AccountOwner : 'Account By Owner'},
       Contact : {LeadSource : 'Contact By Source' , MailingCountry : 'Contact By Country' , ContactOwner : 'Contact By Owner'},
       Opportunity : {LeadSource :'Opportunity By Source' , Country :  'Opportunity By Country' , OpportunityOwner : 'Opportunity By Owner'},
       Resource : {Role : 'Resources By Role' , Designation : 'Resources By Designation'} , 
       Project : {ProjectManager : 'Project By Manager'} , 
  }
};