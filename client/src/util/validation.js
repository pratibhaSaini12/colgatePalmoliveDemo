import React from "react"
module.exports = {
	validateProject(projectdata,ErrorMessage,self)
	{
		var valid=true
		if(projectdata.ProjectName =="")
		{

			valid =false
			self.setState({
				ErrorMessage: "Please fill the project name"
			})
		}
		return valid
	},

	//validation for kycDetail
	_validateKycFormField(data, ErrorMessage, self){
		// var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var valid = true
		if (data.panHolder_name == "") {
			valid = false
			self.setState({
				ErrorMessage: "Please fill the pan name"
			})
		}else if (data.pan_number == "") {
			valid = false
			self.setState({
				ErrorMessage: "Please fill the pan number"
			})
		}else if (data.pan_dob == null || data.pan_dob == null ) {
			valid = false
			self.setState({
				ErrorMessage: "Please fill the date of birth"
			})
		}else if (data.aadhaarHolder_name == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the aadhaar holder name"
			})
		}else if (data.aadhaar_number == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the aadhaar number"
			})
		}else if (data.gross_annual_income == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the gross annual income"
			})
		}else if (data.residential_status == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the residential status"
			})
		}else if (data.street_address == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the street address"
			})
		}else if (data.city == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the city"
			})
		}else if (data.state == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the state"
			})
		}else if (data.pin_code == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the pincode"
			})
		}
		return valid
	},

	//validation for signUp
	_validateIdentity(data, ErrorMessage, self){
    
    
		var valid = true
		// let self = this;
		if (data.identity == null || data.identity == "") {
			valid = false
			self.setState({
				ErrorMessage: "Please select Your Identity"
			})
		}else if (data.expertise == null || data.expertise == "") {
			valid = false
			self.setState({
				ErrorMessage: "Please Select Your Domain of Expertise"
			})
		}
		return valid
	},

	//validation for signUp
	_validateTiming(data, ErrorMessage, self){
    
    
		var valid = true
		// let self = this;
		// if (data.timing == null || data.timing == "") {
		//   valid = false;
		//   self.setState({
		//    ErrorMessage: 'Please Choose Your Timing'
		//   })
		// }else if (data.expertise == null || data.expertise == "") {
		//     valid = false
		//     self.setState({
		//     ErrorMessage: 'Please Select Your Domain of Expertise'
		//   })
		// }
		// return valid
		if (data.timing == null || data.timing == "") {
      
			valid = false
			self.setState({
				ErrorMessage: "Please Select Your Timing"
			})
		}
		return valid
	},

	//validation for signUp
	_validateLocation(data, ErrorMessage, self){
    
    
		var valid = true
    
		// let self = this;
		// if (data.location == null || data.location == "") {
		//   valid = false;
		//   self.setState({
		//    ErrorMessage: 'Please Select Location of Your Service'
		//   })
		// }else if (data.levelOfExpertise == null || data.levelOfExpertise == "") {
		//     valid = false
		//     self.setState({
		//     ErrorMessage: 'Please Select Your Level of Expertise'
		//   })
		// }
		if (data.levelOfExpertise == null || data.levelOfExpertise == "") {
      
			valid = false
			self.setState({
				ErrorMessage: "Please Select Your Level of Expertise"
			})
		}
		return valid
	},

	_validateAadhaarFront(aadhar_filepath, ErrorMessage, self){
		var valid = true
		// let self = this
		if (aadhar_filepath == null || aadhar_filepath == "" ) {
			valid = false
			self.setState({
				ErrorMessage: "Please upload the aadhaar front image"
			})
		}
		return valid
	},

	_validateAadhaarBack(aadhar_filepath, ErrorMessage, self){
		var valid = true
		// let self = this
		if (aadhar_filepath == null || aadhar_filepath == "" ) {
			valid = false
			self.setState({
				ErrorMessage: "Please upload the aadhaar back image"
			})
		}
		return valid
	},

	//validation for BankDetail
	_validateBankFormField(data, ErrorMessage, self){
		var valid = true
		if (data.ifsc_code == "") {
			valid = false
			self.setState({
				ErrorMessage: "Please fill the ifsc code"
			})
		}else if (data.branch_name == "") {
			valid = false
			self.setState({
				ErrorMessage: "Please fill the branch name"
			})
		}else if (data.account_type == "" ) {
			valid = false
			self.setState({
				ErrorMessage: "Please fill the account type"
			})
		}else if (data.bank_name == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the bank name"
			})
		}else if (data.account_holderName == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the account holder name"
			})
		}else if (data.account_no == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the account number"
			})
		}else if (data.confirm_accnum == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the confirm account number"
			})
		}else if (data.account_no != data.confirm_accnum){
			valid = false
			self.setState({
				ErrorMessage: "account number and confirm account number should match"
			})
		}else if (data.mobile_no == ""){
			valid = false
			self.setState({
				ErrorMessage: "Please fill the mobile number"
			})
		}
		return valid
	},

	// method to validate the bank slip image
	_validateBankSlip(bank_image, ErrorMessage, self){
		var valid = true
		// let self = this
		if (bank_image == null || bank_image == "" ) {
			valid = false
			self.setState({
				ErrorMessage: "Please upload the bank slip image"
			})
		}
		return valid
	},

	isNumber(evt) {
	    evt = (evt) ? evt : window.event;
	    var charCode = (evt.which) ? evt.which : evt.keyCode;
	    if ((charCode >= 48 &&  charCode <=57 ) || charCode == 43) {
	        return true;
	    }
	    return false;
	},
	

}



// else if(!filter.test(data.email)){
//         valid = false
//         this.setState({
//           ErrorMessage: 'Please fill the Correct email address'
//         })
//       }

// else if (data.password.search(/^(?=.*[A-Z]).+$/) == -1) {
//         valid = false
//         this.setState({
//           ErrorMessage: 'Password must contain one upper case character'
//         })
//       }
