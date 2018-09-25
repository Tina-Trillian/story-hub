import React from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'



import NotFound from '../NotFound'
import List from './List'
import Details from './Details/index';
import NewStoryForm from './NewStoryForm';




class Stories extends React.Component {
  
    render() {
        return (
                <div>
                    <Switch>
                        <Route exact path="/stories" component={List} />
                        <Route exact path="/stories/new" component={NewStoryForm} />
                        <Route exact path="/stories/:id" component={Details} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
        )
    }
}

export default observer(Stories)

