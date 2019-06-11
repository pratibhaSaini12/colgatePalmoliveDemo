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
			 pictures: [],
			 image: ''
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
			self.getBase64(self.uploadInput.files[0], (result) => {
				var base64 = result.split(",");
				idCardBase64 = base64[1]
				assetBodyData = AssetJsonModel._getJsonDataFromAsset({ base64: idCardBase64, fileName: self.uploadInput.files[0].name, mimetype: self.uploadInput.files[0].type })
                console.log("===assetBodyData====",assetBodyData)
                Axios.post("/api/upload/image",assetBodyData).then((res)=>{
                    console.log("error in response",res)
                    if(res.data){
						console.log("res in uploading",res)
						return 
                    } else {
						console.log("error in response",res)
						return						
                    }
                }).catch((err)=>{
					console.log("err in uploading",err)
					return
                })
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

	getImages(e){
		let self = this
		let imageData =[]
		e.preventDefault()
		try{
			Axios.post("/api/get-images").then((res)=>{
				console.log("res======",res)
				if (res.status === 200){
					console.log("imagessssss", res)
					
					let data = res.data.data[0].imageData
					console.log("imagessssss in json", res.data.data)
					console.log("data in json", JSON.parse(data))
					data = JSON.parse(data)
					let image = "data:"+data.data.mimetype+";base64,"+data.data.data
					console.log("image found===========",image)
					// convert values into object
					if(res.data.data.length){
						res.data.data.map((imageString)=>{
							let imageJsonData = JSON.parse(imageString.imageData)
							imageData.push(imageJsonData.data)
						})
						console.log("imageData=============",imageData)
					}
					self.setState({
						pictures: imageData,
						image: image,
					})

				} else {
					console.log("error in image fetching response", res)
				}
			})
		}catch(err){
			console.log("error in image fetching",err)
		}
		
	}
    render(){
		console.log("statessssss", this.state)
        return(
            <div>
               <form>
               <input type="file" ref={(ref) => { this.uploadInput = ref }} onChange={this.handleUploadAttachment.bind(this)} style={{ display: 'none' }} />
                <a onClick={(e) => this.uploadInput.click()} className="create-new-link">Upload Files</a>

				<button onClick={this.getImages.bind(this)}>get images</button>
               </form>
			   {this.state.image !== '' && this.state.image !== undefined ?
			   <img src={this.state.image} height="50px" width="50px"/>
			: ''}
                
            </div>
        )
    }
}
export default UploadImage;