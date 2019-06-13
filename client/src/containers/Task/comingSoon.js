import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
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
                <Header/>
                <h1>Comming Soon</h1>
                <h1>Comming Soon</h1>

                <h1>Comming Soon</h1>
                <h1>Comming Soon</h1>

                <Footer/>
            </div>
		)
	}
}


export default ComingSoon;
