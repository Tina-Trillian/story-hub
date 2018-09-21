import React from 'react';
import NewStoryStore from '../../../Store/NewStoryStore';
import { observer } from 'mobx-react'



const Details = () => {
    const story = NewStoryStore.story;

    console.log(story)

    let genreList
    if(story.genre) genreList = story.genre.map((el, index) => {
        return <li key={`genr_${index}`}>{el}</li>
    })

    let tagList
    if(story.tag) tagList = story.tag.map((el, index) => {
        return <li key={`tag_${index}`}>{el}</li>
    })

    return (
        <div>
            <h2>{story.title}</h2>
            <h3>{story.tagline}</h3>
            <ul>{genreList}</ul>
            <ul>{tagList}</ul>
        </div>
    );
};

export default observer(Details);