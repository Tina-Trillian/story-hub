import React from 'react'
import { Redirect } from 'react-router-dom'

import UserStore from '../../Store/UserStore'

//deletes the User token from the local Storage and resets the User Store

class Logout extends React.Component {
    constructor(props) {
        super(props)

        localStorage.removeItem('identity')
        UserStore.resetUser()
    }

    render() {
        return <Redirect to="/" />
    }
}

export default Logout
