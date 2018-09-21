import React from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'


import Auth from './Auth'
import Home from './Home'
import Navigation from './Navigation'
import Profile from './Profile'
import ProfilePublic from './Public/ProfilePublic'

import Stories from './Stories'
import NotFound from './NotFound'


import UserStore from '../Store/UserStore'


class Application extends React.Component {
    componentDidMount() {
         UserStore.setUser()
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/profile/:id" component={ProfilePublic} />
                        <Route path="/stories" component={Stories} />
                        <Route path="/auth" component={Auth} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default observer(Application)

