import React from 'react';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
  }

  openPage(e) {
    console.log(e.target.name)
  }

  change(e) {
    try {
      this.setState({
        [e.target.name]: e.target.value,
      })
      if (this.state.searchValue == '') {
        return;
      }
    } 
    catch(e) {  }
  }

  render() {

    return (
      <div>
        {/* <ul>
              <li><Link to="/invest" >Invest</Link></li>
              <li><Link to="/raise" >Raise</Link></li>
              <li><Link to="/about" >About</Link></li>
              <li><Link to="/contact" >Contact</Link></li>
              <li><Link to="/login" >Login</Link></li>
              <li><Link to="/signup" >Signup</Link></li>
            </ul> */}
        <header className="topbar">
          <nav className="navbar top-navbar navbar-expand-md navbar-light">
            <div className="navbar-collapse container-fluid">
              <ul class="navbar-nav col-md-9">
                {/* This is  */}
                <li className="nav-item"> <a className="nav-link nav-toggler hidden-md-up waves-effect waves-dark" href="javascript:void(0)"><i className="ti-menu" /></a> </li>
                <li className="nav-item"> <a className="nav-link sidebartoggler hidden-sm-down waves-effect waves-dark" href="javascript:void(0)"><i className="ti-menu" /></a> </li>
                <li className="nav-item hidden-sm-down">
                  <span>  <Link to="/dashboard">
                    <ImageContainer src="logo.png" alt="PIMCORE" />
                  </Link> </span>
                </li>
                <li className="nav-item -xs-down search-box">
                  <form className="app-search" style={{ display: 'block !important' }}>
                    <input type="text" className="form-control" placeholder="Search Product, Assets or List" name="searchValue" onChange={e => this.change(e)} />
                    <Link to={{ pathname: '/search', state: { _data: this.state.searchValue } }} className="nav-link hidden-sm-down waves-effect waves-dark search_top" ><i className="ti-search" /></Link>
                  </form>
                </li>
              </ul>

              <ul className="navbar-nav">
                <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle waves-effect waves-dark" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="ti-bell all_iconsize" />
                  <div className="notify" />
                </a> </li>
                <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle waves-effect waves-dark" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="adminsection">Jessica Jones <br />
                  <b>admin</b></span>
                  <ImageContainer src="profile.png" alt="user" className="profile-pic" />
                  <i className="fas fa-caret-down all_iconsize caretdrop" /></a>
                </li>
                <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle waves-effect waves-dark" href="#"> <i className="ti-help-alt all_iconsize" /> </a> </li>

              </ul>
            </div>
          </nav>
        </header>
      </div>
    )
  }
}



export default Header;