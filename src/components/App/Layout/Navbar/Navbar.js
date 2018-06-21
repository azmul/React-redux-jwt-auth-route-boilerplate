import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../../../redux/actions/authActions';

import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    handleLogout = () =>{
        this.props.logoutUser();
    }
    render() {
        const {isAuthenticated, user} = this.props.auth;
        let Links;
        if(isAuthenticated){
           Links = (
            <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a href="#" className="nav-link" onClick={this.handleLogout}>
                      <img className="rounded-circle" src={user.avatar} alt={user.name} style={{width:'25px', marginRight:'5px'}} />
                      Logout
                      </a>
                  </li>
                </ul>
            )
        }else{
           Links = (
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    {<NavLink className="nav-link" exact strict to="/register">Sign Up</NavLink>}
                  </li>
                  <li className="nav-item">
                    {<NavLink className="nav-link" exact strict to="/login">Login</NavLink>}
                  </li>
              </ul>
            )
        }

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
              {<NavLink className="navbar-brand"  exact strict to="/">Developers</NavLink>}
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon"></span>
              </button>
        
              <div className="collapse navbar-collapse" id="mobile-nav">
                {Links}
              </div>
            </div>
          </nav>
        );
    }
}

Navbar.propTypes ={
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object
}

const mapStateToProps = ({auth}) =>{
     return{
       auth: auth
     }
}
export default connect(mapStateToProps,{logoutUser})(Navbar);

