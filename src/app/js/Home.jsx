import React from 'react'
import {Link} from "react-router-dom"
import { observer, renderReporter } from 'mobx-react'
import UserStore from '../Store/UserStore'
import StoryStore from '../Store/StoryStore';
import { toJS} from "mobx"

import StoryCard from "./Stories/StoryCard"



class Home extends React.Component {

    componentDidMount() {
        StoryStore.getHomeStories();
        
    }


    render() {

        const newStories = StoryStore.latest_new.map((story, index) => {
            return <StoryCard key={`str_${index}`}story={story} />
        })

        const newUpdates = StoryStore.latest_updated.map((story, index) => {
            return <StoryCard key={`upd_${index}`}story={story} />
        })

   

    return (
        <div className="container">
            <h1>Hello, {UserStore._id ? UserStore.username : 'Stranger'}!</h1>
            <h3><Link to="/stories/all">See all stories</Link></h3>
            <p>Latest Stories</p>
            {newStories}
            <p>Latest Updates</p>
            {newUpdates}
        </div>
    )}
}

export default observer(Home)
