import React, { Component } from "react"
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Dashboard from "../Dashboard/dashboard"
import { Link } from "react-router-dom"


class Aside extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }


  componentDidMount() {
  }



  render() {
    console.log("props in navbar", this.props)
    return (
      <div>
        <aside className="left-sidebar">
          {/* Sidebar scroll*/}
          <div className="scroll-sidebar">
            {/* Sidebar navigation*/}
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                <li className={this.props.active ==="dashboard" ? "active" : ''}>
                  <Link to={"/dashboard"} className="has-arrow waves-effect waves-dark" aria-expanded="false">
                    <i className="sprite_icon dashboard" />
                    <span className="hide-menu">Dashboard </span>
                  </Link>
                </li>
                <li  className={this.props.active ==="product" ? "active" : ''}>
                  <a className="has-arrow waves-effect waves-dark" href="javascript:void(0);" aria-expanded="false"> <i className="sprite_icon product" /><span className="hide-menu">Products </span></a>
                  <ul aria-expanded="false" className="collapse">
                    <li><Link to={"/productlist"}>View All</Link></li>
                    <li><a href="javascript:void(0);">Manage Collections</a></li>
                  </ul>
                </li>
                <li  className={this.props.active ==="digital" ? "active" : ''}>
                   <a className="has-arrow waves-effect waves-dark" href="javascript:void(0);" aria-expanded="false"><i className="sprite_icon digital" /><span className="hide-menu">Digital Assets</span></a>
                  <ul aria-expanded="false" className="collapse">
                    <li className={this.props.active ===true ? "active" : ''}><Link to={"/digitalImages"}>Images</Link></li>
                    <li className={this.props.active ===true ? "active" : ''}><Link to={"/digitalVideo"}>Videos</Link></li>
                    <li className={this.props.active ===true ? "active" : ''}><Link to={"/digitalDocuments"}>Documents</Link></li>
                   </ul>
                </li>
                <li className={this.props.active ==="Task" ? "active" : ''}>
                  <a className="has-arrow waves-effect waves-dark" aria-expanded="false">
                    <i className="sprite_icon more_icon" />
                    <span className="hide-menu">More </span>
                  </a>
                <ul aria-expanded="false" class="collapse">
                <li><Link to="/channels">Channels</Link></li>
                <li><Link to="/comingSoon">Catalogs</Link></li>
                <li><Link to="/comingSoon">Imports</Link></li>
                <li><Link to="/taskList">Task</Link></li>
                <li><Link to="/comingSoon">Workflow</Link></li>
                </ul>
                </li>

            


              </ul>
            </nav>
            {/* End Sidebar navigation */}
          </div>
          {/* End Sidebar scroll*/}
        </aside>
      </div>
    )
  }
}


export default Aside;