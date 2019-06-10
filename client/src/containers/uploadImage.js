import React, { Component } from "react"
// import Header from '../containers/Header/index';
// import Aside from '../containers/SideBar/index';
// import axios from "axios";
import AssetJsonModel from '../ObjectJsonModel/assetStateToJson'
import Axios from "axios";
class UploadImage extends Component {

    constructor(props) {
        super(props)
        this.state = {
             pictures: [] 
        }
    }
    handleUploadAttachment(ev) {
        console.log("ev========",ev)
		let self = this
		var idCardBase64
		var assetBodyData
		ev.preventDefault()
		var FileSize = self.uploadInput.files[0].size / 1024 / 1024;
		if (FileSize <= 5) {
			self.setState({
				Loading: true
			})
			self.getBase64(self.uploadInput.files[0], (result) => {
				var base64 = result.split(",");
				idCardBase64 = base64[1]
				assetBodyData = AssetJsonModel._getJsonDataFromAsset({ base64: idCardBase64, fileName: self.uploadInput.files[0].name, mimetype: self.uploadInput.files[0].type })
                console.log("===assetBodyData====",assetBodyData)
                Axios.post("/api/upload/image",assetBodyData).then((res)=>{
                    console.log("error in response",res)
                    if(res.data){
                        console.log("res in uploading",res)
                    } else {
                        console.log("error in response",res)
                    }
                }).catch((err)=>{
                    console.log("err in uploading",err)
                })
				// axios.post(properties.baseUrl + "asset?apikey=" + properties.apiKey, JSON.stringify(assetBodyData.data)).then(function (response) {
				// 	if (response.status == 200 && response.data.data.id != undefined) {
				// 		var attachmentBodyData = AttachmentJsonModel._getJsonDataFromAttachment({ ObjectId: self.state.oo_id, AttachmentObject: "Activity", AttachmentName: self.uploadInput.files[0].name, AttachmentFile: "/" + self.uploadInput.files[0], AttachmentPath: self.uploadInput.files[0].name, AssetId: response.data.data.id, AssetSubType: response.data.data.type, Attachment_OO_Id: '' })
				// 		console.log("===attachmentBodyData====",attachmentBodyData)
				// 		axios.post(properties.baseUrl + "object?apikey=" + properties.apiKey, JSON.stringify(attachmentBodyData)).then(function (response) {
				// 			if (response.status == 200) {
				// 				self.getAttachmentList(self.state.oo_id)
				// 				self.setState({
			    //                 	Loading: false
			    //                  })
				// 			}
				// 		}).catch(function (error) {
				// 			self.setState({
				// 				ActiveErrorMessage: true
				// 			})
				// 		})
				// 	}
				// }).catch(function (error) {
				// 	self.setState({
				// 		ActiveErrorMessage: true
				// 	})
				// })
			});
		}
		else {
			console.log("fileSizeExceedMessage=======")
		}
    }
    
    //Method to get Bas64 of file
	getBase64(file, cb) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			cb(reader.result)
		};
		reader.onerror = function (error) {
		};
	}
    render(){
        return(
            <div>
               <form>
               <input type="file" ref={(ref) => { this.uploadInput = ref }} onChange={this.handleUploadAttachment.bind(this)} style={{ display: 'none' }} />
                <a onClick={(e) => this.uploadInput.click()} className="create-new-link">Upload Files</a>
               </form>
                
            </div>
        )
    }
}
export default UploadImage;