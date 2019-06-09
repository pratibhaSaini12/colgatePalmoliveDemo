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
    return (
      <div>
        <aside className="left-sidebar">
          {/* Sidebar scroll*/}
          <div className="scroll-sidebar">
            {/* Sidebar navigation*/}
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                <li>
                  <Link to={"/dashboard"} className="has-arrow waves-effect waves-dark" aria-expanded="false">
                    <i className="sprite_icon dashboard" />
                    <span className="hide-menu">Dashboard </span>
                  </Link>
                </li>
                <li><a className="has-arrow waves-effect waves-dark" href="javscript:void(0)" aria-expanded="false"> <i className="sprite_icon product" /><span className="hide-menu">Products </span></a>
                  <ul aria-expanded="false" className="collapse">
                    {/* <li><a href="productlist.html">View All</a></li> */}
                    <li><Link to={"/productlist"}>View All</Link></li>
                    <li><a href="avascript:void(0)">Manage Collections</a></li>
                  </ul>
                </li>
                <li> <a className="has-arrow waves-effect waves-dark" href="javscript:void(0)" aria-expanded="false"><i className="sprite_icon digital" /><span className="hide-menu">Digital Assets</span></a>
                  <ul aria-expanded="false" className="collapse">
                    <li><a href="digitalImage.html">Images</a></li>
                    <li><a href="digitalVideo.html">Videos</a></li>
                    <li><a href="digitalDocuments.html"> Documents</a></li>
                  </ul>
                </li>
                <li> <a className="has-arrow waves-effect waves-dark" href="javscript:void(0)" aria-expanded="false"><i className="sprite_icon more_icon" /><span className="hide-menu">More</span></a>
                  <ul aria-expanded="false" className="collapse">
                    <li><a href="channels.html">Channels</a></li>
                    <li><a href="javascript:void(0)">Catalogs</a></li>
                    <li><a href="javascript:void(0)">Imports</a></li>
                    <li><a href="javascript:void(0)">Tasks</a></li>
                    <li><a href="javascript:void(0)">Workflow</a></li>
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