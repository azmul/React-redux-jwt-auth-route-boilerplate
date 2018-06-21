import React from 'react';
import { Route } from 'react-router-dom';

import Landing from '../Layout/Landing/Landing';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Dashboard from '../Dashboard/Dashboard';

const Routes = (
    <div>
        <Route path="/" exact strict component={Landing} />
        <Route path="/login" exact strict component={Login} />
        <Route path="/register" exact strict component={Register} />
        <Route path="/dashboard" exact strict component={Dashboard} />
    </div>
)

export default Routes;