import { GET_ERRORS,SET_CURRENT_USER } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';

// user register
export const registerUser = (userData, history) =>
    async dispatch=>{
        axios.post('/api/users/register',userData)
            .then(res=> history.push('/login'))
            .catch(err =>{
                dispatch({type: GET_ERRORS, payload: err.response.data})
            });
    }

// Login user -- get token
export const loginUser = (userData) =>
    async dispatch =>{
         axios.post('/api/users/login',userData)
              .then(res=>{
                  // save token to localStorage
                  const {token} = res.data;
                  localStorage.setItem('jwtToken', token);
                  // Set token to Auth Header
                  setAuthToken(token);
                  // decode token to set user data
                  let decoded = jwt_decode(token);
                  dispatch(setCurrentUser(decoded));

              }).catch(err =>{
                dispatch({type: GET_ERRORS, payload: err.response.data})
              });
    }
// set logged in user
export const setCurrentUser = decoded =>{
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
// set logout user
export const logoutUser = () => dispatch =>{
    // remove jwtToken from localStorage
    localStorage.removeItem('jwtToken');
    // remove auth header for future request
    setAuthToken(false);
    // Set current user to {} and isAuthenticated to false
    dispatch(setCurrentUser({}));

}

