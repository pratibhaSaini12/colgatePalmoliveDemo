import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../Header/index';
import Aside from '../SideBar/index';
import Footer from '../Footer/index';
import ImageContainer from "../../components/imageContainer"
class NewTask extends Component {

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
        {/* <div className="preloader">
                    <div className="loader">
                        <div className="loader__figure"></div>
                        <p className="loader__label">Please Wait..</p>
                    </div>
                </div> */}
        <div id="main-wrapper">
          <Header />
          <Aside />
          <div className="page-wrapper channel">
            <div className="container-fluid r-aside custome_container">
              <div className="page-header">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="page-title">Task Information</h2>
                  </div>
                </div>
              </div>
              <div className="card mytask filtercustome">
                <div className="col-md-5 align-self-center">
                  <form className="row">
                    <div className="form-group col-md-12">
                      <label>Due Date</label>
                      <input className="form-control" type="date" name />
                    </div>
                    <div className="form-group col-md-12">
                      <label>Assigned By</label>
                      <select id="pref-perpage" className="form-control">
                        <option value={0}>Assigned By</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                      </select>
                    </div>
                    <div className="form-group col-md-11">
                      <label>Assigned To</label>
                      <input className="form-control" type="text" name placeholder="Assigned To" />
                    </div>
                    <div className="search_icon col-md-1" data-toggle="modal" data-target="#colgate"><i className="ti-search" /></div>
                    <div className="form-group col-md-12">
                      <label>Subject</label>
                      <input className="form-control" type="text" name="search" placeholder="Subject" />
                    </div>
                    <div className="form-group col-md-12">
                      <label>Prioity</label>
                      <select id="pref-perpage" className="form-control">
                        <option value={0}>Prioity</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12">
                      <label>Status</label>
                      <select id="pref-perpage" className="form-control">
                        <option value={0}>Open</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12">
                      <label>Releted To</label>
                      <select id="pref-perpage" className="form-control">
                        <option value={0}>None</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                      </select>
                    </div>
                    <div className="allmodalcolgate col-md-12">
                      <button type="button" className="btn btn-primary">Save</button>
                      <button type="button" className="btn btn-outline-primary">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* The Modal */}
          <div className="modal fade allmodalcolgate" id="search_list">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header search_header">
                  <h4 className="modal-title title_modalheader">Search User</h4>
                  <button type="button" className="close" data-dismiss="modal">×</button>
                </div>
                {/* Modal body */}
                <div className="modal-body filtercustome">
                  <div className="search_user_section">
                    <form>
                      <div className="form-group filtercustome">
                        <div className="row">
                          <label htmlFor="inputPassword" className="col-form-label col-sm-4">User Name</label>
                          <div className="col-sm-8">
                            <input className="form-control" type="text" name="search" placeholder="Colget" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <center>
                    <button type="button" className="btn btn-primary">Go</button>
                    <button type="button" className="btn btn-outline-primary">Cancel</button>
                  </center>
                  <ul className="userlist_task">
                    <li className="active_user">User Name</li>
                    <li>Colget</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}


export default NewTask;
