import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import { withRouter } from 'react-router'
import SignUpStore from '../../Store/SignUpStore';

class SignUp extends React.Component {
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
                <h1>SignUp</h1>
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
                    type="text"
                    value={SignUpStore.username}
                    onChange={evt => SignUpStore.handleInputChange('username', evt.target.value)}
                    className="input"
                    placeholder="Username"
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
                <input
                    type="file"
                    // value={SignUpStore.picture}
                    onChange={evt => SignUpStore.handleInputChange('picture', evt.target.files[0])}
                    className="input"
                    placeholder="Profile Picture"
                />
                <br />
                <br />
                <button className="button" onClick={() => {
                    SignUpStore.sign('up').then(data => { this.props.history.push("/")})
                    }}>
                    Sign Up
                </button>
                <br />
                <br />
                <p>{SignUpStore.error}</p>
                <br />
                <br />
                <p>{SignUpStore.message}</p>
                <div className="separator" />
                <Link className="link" to="/auth/sign-in">
                    Do you have an account already? Sign in instead!
                </Link>
            </div>
        )
    }
}

export default withRouter(observer(SignUp))
