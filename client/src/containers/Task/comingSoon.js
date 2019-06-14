import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import Footer from '../Footer/index';
import { Link } from "react-router-dom"
class ComingSoon extends Component {

	constructor(props) {
        super(props)
        this.state = {
       }
    }


    componentDidMount() {
        console.log("hi")
     }

    

	render() {
		const { list } = this.state;
		console.log(list);
		return (
			<div>
                   <div id="main-wrapper">
<Header />
<Aside active={"Task"} />
<div className="container-fluid r-aside custome_container">
            <div className="comingsoonpage">
                <center>
            <h1>Coming Soon...</h1>
            </center>
            </div>
    </div>
            </div>
            </div>
            
		)
	}
}


export default ComingSoon;
