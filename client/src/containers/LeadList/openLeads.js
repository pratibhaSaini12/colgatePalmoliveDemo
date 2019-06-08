import React, { Component } from "react"
import { Link } from "react-router-dom"
class OpenLeads extends Component {


  render(){
    return (
     <div className="dashboard-filter clearfix">
          <div className="row">
            <div className="col-md-8">
              <div className="pull-left">
                <div className="search-resource-container">
                  <form className="search-resource-form">
                    <div className="searchbox-input pull-left">
                      <input type="text" placeholder="Search..." />
                    </div>
                    <div className="searchbox-submit pull-left">
                      <input type="submit" value="Search" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              
            </div>
          </div>
      </div>
    );
}

}

export default OpenLeads
