import React from 'react';
import { Link } from "react-router-dom"
import ImageContainer from "../../components/imageContainer"



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      userData:''
    };
    //this.logOutuser = this.logOutuser.bind(this);
  }


    componentWillMount() {
      if(sessionStorage.getItem('userData') !== null ) {
       
        let tempData = JSON.parse(sessionStorage.getItem('userData'))
        //  let tempObj =  Object.assign(this.state.userData,tempData.userData)
         this.setState({userData:tempData.userData})
      }
  
    }

  openPage(e) {
    console.log(e.target.name)
  }

  change(e) {
    try {
      this.setState({
        [e.target.name]: e.target.value,
      })
    } 
    catch(e) {  }
  }

  logOutuser(event) {
    sessionStorage.clear();
    console.log("user list")
    window.location.href = '/'

  }

  render() {
    console.log("user data",this.state.userData)
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
                    <input type="text" className="form-control" placeholder="Search Product, Task" name="searchValue" onChange={e => this.change(e)}/>
                 {this.state.searchValue? <Link to={{ pathname: '/search', state: { _data: this.state.searchValue } }} className="nav-link hidden-sm-down waves-effect waves-dark search_top" ><i className="ti-search" /></Link>:<Link to="#" className="nav-link hidden-sm-down waves-effect waves-dark search_top" ><i className="ti-search" /></Link>}
                  </form>
                </li>
              </ul>

              <ul className="navbar-nav">
                <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle waves-effect waves-dark curser_auto" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="ti-bell all_iconsize" />
                  <div className="notify" />
                </a> </li>
                <li className="nav-item dropdown"> 
                    <Link className="nav-link dropdown-toggle waves-effect waves-dark"  to="/comingSoon" onClick={this.logOutuser}   aria-haspopup="true" aria-expanded="false"><span className="adminsection">
                    {`${this.state.userData !== '' ? this.state.userData.first_name :''} ${this.state.userData!==''?this.state.userData.last_name:''}`}<br />
                  </span>
                <ImageContainer src="profile.png" alt="user" className="profile-pic" />
                  <i className="fas fa-caret-down all_iconsize caretdrop" /></Link> 
                </li>

                <li className="nav-item dropdown"> <Link className="nav-link dropdown-toggle waves-effect waves-dark"  onClick={this.logOutuser}  to="#"><i class="fa fa-sign-out-alt"></i> </Link> </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    )
  }
}



export default Header;