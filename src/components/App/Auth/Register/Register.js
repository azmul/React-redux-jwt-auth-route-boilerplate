import React, { Component } from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Register.css';
import { registerUser } from '../../../../redux/actions/authActions';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            email: '',
            password: '',
            password2: '',
            errors:{}                
         };                      
    }
    componentDidMount = ()=>{
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }
    componentWillReceiveProps = (nextProps)=>{
       if(nextProps.errors){
           this.setState({errors: nextProps.errors})
       }
    }
    submitHandelar = (event)=>{
        event.preventDefault();
        const {name,email,password,password2} = this.state;
        const newUser = {
            name: name,
            email: email,
            password: password,
            password2: password2
        }
        this.props.registerUser(newUser, this.props.history);
    }

    handleInputChange =(event)=> {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    render() {
        const {name,email,password,password2,errors} = this.state;
        const {user} = this.props.auth;
        console.log(errors);
        
        return (
            <div className="register">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your DevConnector account</p>
                    <form noValidate onSubmit={this.submitHandelar}>
                        <div className="form-group">
                        <input 
                             type="text" 
                             className={classnames('form-control form-control-lg',{
                                 'is-incalid': errors.name
                             })}
                             placeholder="Name" 
                             name="name" 
                             value={name}
                             onChange={this.handleInputChange}
                             required
                             />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                        </div>
                        <div className="form-group">
                        <input 
                             type="email" 
                             className={classnames('form-control form-control-lg',{
                                'is-incalid': errors.email
                            })}
                             placeholder="Email Address" 
                             name="email" 
                             value={email} 
                             onChange={this.handleInputChange}
                             required
                             />
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                        <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                        </div>
                        <div className="form-group">
                        <input 
                             type="password" 
                             className={classnames('form-control form-control-lg',{
                                'is-incalid': errors.password
                            })} 
                             placeholder="Password" 
                             name="password" 
                             value={password}
                             onChange={this.handleInputChange}
                             />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                        </div>
                        <div className="form-group">
                        <input 
                             type="password" 
                             className={classnames('form-control form-control-lg',{
                                'is-incalid': errors.password2
                            })}
                             placeholder="Confirm Password" 
                             name="password2" 
                             value={password2}
                             onChange={this.handleInputChange}
                             />
                        {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = ({auth , errors}) =>{
    return{
        auth : auth,
        errors: errors.errors
    }
}
export default connect(mapStateToProps,{registerUser})(withRouter(Register));