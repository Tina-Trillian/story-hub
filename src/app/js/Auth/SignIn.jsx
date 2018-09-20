import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'

import SignUpStore from '../../Store/SignUpStore'


class SignIn extends React.Component {

    componentDidMount() {
        SignUpStore.handleInputChange('error', '')
        // SignUpStore.handleInputChange('email', '')
        // SignUpStore.handleInputChange('password', '')
    }
    //can be "switched on" to defer the memory of the input between
    //sites 

    render() {

        return (
            <div className="container">
                <h1>SignIn</h1>
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
                <div className="separator" />
                <Link className="link" to="/auth/sign-up">
                    Don't have an account yet? Sign up instead!
                </Link>
            </div>
        )
    }
}

export default withRouter(observer(SignIn))
