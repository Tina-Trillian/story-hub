import React from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'


import NewStoryForm from "./NewStoryForm"
import NewStoryStore from '../../../Store/NewStoryStore';
import NewPart from "./NewPart"
import Details from "./Details"



class NewStory extends React.Component {
  
    render() {
    
        return (
            <BrowserRouter>
                <div>
                   
                        {!NewStoryStore.storySent && <NewStoryForm />}
                        {NewStoryStore.storySent && <Details /> }
                        {NewStoryStore.storySent && <NewPart />}
                    
                </div>
            </BrowserRouter>
        )
    }
}

export default observer(NewStory)

