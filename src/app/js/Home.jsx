import React from 'react'
import {Link} from "react-router-dom"
import { observer } from 'mobx-react'
import UserStore from '../Store/UserStore'


const Home = props => {
    
    return (
        <div className="container">
            <h1>{UserStore._id ? UserStore.username : 'Stranger'}!</h1>
            <h3><Link to="/stories">See all stories</Link></h3>
        </div>
    )
}

export default observer(Home)
