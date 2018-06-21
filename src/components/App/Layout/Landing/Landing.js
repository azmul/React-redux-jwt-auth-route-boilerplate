import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './Landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount = ()=>{
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">Developer Connector
                        </h1>
                        <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                        <hr />
                        {<NavLink  className="btn btn-lg btn-info mr-2" exact strict to="/register">Sign Up</NavLink>}
                        {<NavLink className="btn btn-lg btn-light" exact strict to="/login">Login</NavLink>}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.func.isRequired
}
const mapStateToProps = ({auth}) =>{
    return{
        auth: auth
    }
}
export default connect(mapStateToProps)(Landing);