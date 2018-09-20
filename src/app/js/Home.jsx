import React from 'react'
import { observer } from 'mobx-react'
import UserStore from '../Store/UserStore'


const Home = props => {
    console.log(localStorage.getItem("identity"))
    
    return (
        <div className="container">
            <h1>Hello, {UserStore._id ? UserStore.username : 'Stranger'}!</h1>
        </div>
    )
}

export default observer(Home)
