import React from 'react';
import { Link } from "react-router-dom"


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  openPage(e) {
    console.log(e.target.name)
  }
  render() {

    return (
      <div>
        <header><span>test header</span>
          <ul>
            <li><Link to="/invest" >Invest</Link></li>
            <li><Link to="/raise" >Raise</Link></li>
            <li><Link to="/about" >About</Link></li>
            <li><Link to="/contact" >Contact</Link></li>
            <li><Link to="/login" >Login</Link></li>
            <li><Link to="/signup" >Signup</Link></li>
          </ul>
        </header>
      </div>
    )
  }
}



export default Header;