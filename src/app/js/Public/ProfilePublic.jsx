import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { withRouter } from "react-router";


import ProfileStore from '../../Store/ProfileStore'

@observer
class ProfilePublic extends Component {

    componentDidMount() {
        
        ProfileStore.getUser(this.props.match.params.id)
    
    }

    render() {

        const stories = ProfileStore.stories.map((el, index) => {
        return <li key={`stor_${index}`}><Link to={`/stories/${el._id}`}>{el.title}</Link></li>})

        const parts = ProfileStore.parts.map((el, index) => {
            return <li key={`part_${index}`}><Link to={`/stories/${el.story._id}`}>{el.story.title}</Link></li>
        })

        return (
            <div className="container">
                <img src="" alt="" width="100px"/>
                <br />
                {ProfileStore.username}
                <br />
                {ProfileStore.description}
                <br />
                <img src={ProfileStore.profilePicture}/>
                <p>Here are the stories I created:</p>
                <ul>
                    {stories}
                </ul>
                <p>Here are the stories I contributed to:</p>
                <ul>
                    {parts}
                </ul>
            </div>
        )
    }
}

export default withRouter(ProfilePublic)