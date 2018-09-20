import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'

import api from '../utils/api'

import SignUp from './SignUp'
import Logout from './Logout'
import SignIn from './SignIn'
import NotFound from '../NotFound'

class Auth extends Component {
    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/auth/sign-up"
                    component={SignUp}
                />
                <Route
                    exact
                    path="/auth/sign-in"
                    render={SignIn}
                    />
                <Route
                    exact
                    path="/auth/logout"
                    component={Logout}
                />
                <Route component={NotFound} />
            </Switch>
        )
    }
}

export default withRouter(Auth)
