import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'

import SignUpStore from '../../Store/SignUpStore'
import UserStore from '../../Store/UserStore';


class SignIn extends React.Component {

    componentDidMount() {
        SignUpStore.handleInputChange('error', '')
        // SignUpStore.handleInputChange('email', '')
        // SignUpStore.handleInputChange('password', '')
    }
    //can be "switched on" to defer the memory of the input between
    //sites 

    render() {

        if(UserStore._id) return <Redirect to="/" />

        return (
            <div className="full-page">
                <div className="form-container mx-auto my-md-5 pt-5">
                <h1 className="mb-4">SignIn</h1>
                <input
                    type="email"
                    value={SignUpStore.email}
                    onChange={evt => SignUpStore.handleInputChange('email', evt.target.value)}
                    className="input"
                    placeholder="E-Mail"
                />
                <br />
                <br />
                <input
                    type="password"
                    value={SignUpStore.password}
                    onChange={evt => SignUpStore.handleInputChange('password', evt.target.value)}
                    className="input"
                    placeholder="Password"
                />
                <br />
                <br />
                <button className="button" onClick={() => {
                    SignUpStore.sign('in').then(data => { this.props.history.push("/")})
                    }}>
                    Sign In
                </button>
                <br />
                <br />
                <p>{SignUpStore.error}</p>
                {/* Displays the error when there is one */}
                <Link className="link" to="/auth/sign-up">
                    Don't have an account yet? Sign up instead!
                </Link>
            </div>
            </div>
        )
    }
}

export default withRouter(observer(SignIn))
//exports the component with the url-parameters and "observes" the changes
//in the Stores that are imported
