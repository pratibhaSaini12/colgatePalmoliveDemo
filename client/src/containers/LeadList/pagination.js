import React, { Component } from "react"
class Pagination extends Component {
	constructor(props)
	{
		super(props)
		this.state={
			pageactive :this.props.pageactive,
			firstpage:'',
			lastpage:'',
			cursormove:false,
			cursormovelast:true
		}

	}

	componentWillReceiveProps(nextprops)
	{

		this.setState({
			pageactive : nextprops.pageactive
		})
	}
	
	onchange(i,pages)
	{
		if(i==0)
		{
			this.setState({
				cursormove:false,
				cursormovelast:true
			})
		}else if(Math.ceil(pages)==i+1){
			this.setState({
				cursormove:true,
				cursormovelast:false
			})
		}
		else{
			this.setState({
			cursormove:true,
			cursormovelast:true

		})
		}
		this.setState({
			pageactive : i+1
		})
		this.props.changeactive(i+1)
	}
	onnext(pages)
	{
		if(pages<=this.state.pageactive)
		{
			return
		}

		if(pages<=this.state.pageactive+1)
		{
			this.setState({
				cursormove:true,
				cursormovelast:false
			})
		}else{
			this.setState({
				cursormove:true,
				cursormovelast:true,
			})				
		}
		var next = this.state.pageactive+1
		this.setState({
			pageactive : next
		})
		this.props.changeactive(next)
	}
	onprev(pages)
	{
		if(this.state.pageactive==1)
		{
			return
		}
		if(this.state.pageactive-1==1)
		{
			this.setState({
				cursormove:false,
				cursormovelast:true
			})
		}else{
			this.setState({
				cursormove:true,
				cursormovelast:true,
			})				
		}
		var prev = this.state.pageactive-1
		this.setState({
			pageactive : prev
		})
		this.props.changeactive(prev)
	}
	onfirst(pages) {
		this.setState({
			pageactive: pages,
			cursormove:false,
			cursormovelast:true
		})
		this.props.changeactive(pages)
	}

	onlast(pages) {
		this.setState({
			pageactive: pages,
			cursormove:true,
			cursormovelast:false,
		})
		this.props.changeactive(pages)
	}

	render(){
		const {leadsList} = this.props
		const indexOfLastTodo = this.state.pageactive * 15;
    	const indexOfFirstTodo = indexOfLastTodo - 15;
    	const currentTodos = leadsList.slice(indexOfFirstTodo, indexOfLastTodo);
    	
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(leadsList.length / 15); i++) {
      pageNumbers.push(i);
    }

   	const pages = leadsList.length/15
		var lis = []

		for (var i=0; i<pages; i++) {
			if(i==this.state.pageactive-1)
			{
				lis.push(<li><a onClick={this.onchange.bind(this,i,pages)} className="active">{i+1}</a></li>)
			}
			else{
				lis.push(<li><a onClick={this.onchange.bind(this,i,pages)}>{i+1}</a></li>)
			}
		}
		return (
			<div className="container-fluid">
				<ul className="pagination pull-right">
					<li><a onClick={this.onfirst.bind(this,pageNumbers[0])}>First</a></li>
					<li><a onClick={this.onprev.bind(this,pages)} style={{cursor:this.state.cursormove?'pointer':'not-allowed'}}>Previous</a></li>

					{lis}

					<li><a onClick={this.onnext.bind(this,pages)} style={{cursor:this.state.cursormovelast?'pointer':'not-allowed'}}>Next</a></li>
					<li><a onClick={this.onlast.bind(this,pageNumbers[pageNumbers.length-1])}>Last</a></li>
				</ul>
			</div>

		)
	}
}
export default Pagination
