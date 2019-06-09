import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Footer from '../Footer/index';
class Dashboard extends Component {

	constructor(props) {
        super(props)
        this.state = {
       }
    }


    componentDidMount() {
     }

    

	render() {
		const { list } = this.state;
		console.log(list);
		return (
			<div>
                <Header/>
                <h1>Landing Page</h1>
                

                <Footer/>
            </div>
		)
	}
}


export default Dashboard;
