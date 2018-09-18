import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'

import UserStore from '../../Store/User'

@observer
class Profile extends Component {
    render() {
        if (!UserStore) return <Redirect to="/auth/sign-in" /> // this is actually the protection


        return (
            <div className="container">
                <img src={UserStore.profilePicture} alt="" />
                <br />
                {UserStore.username}
                <br />
                {UserStore.email}
                <br />
                {UserStore.description}
            </div>
        )
    }
}

export default Profile
