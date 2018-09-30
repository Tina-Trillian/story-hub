import React from 'react';

//Simple display component to show the character information

const CharacterCard = ({character}) => {
    return (
        <div className="character my-2 pt-4">
            <h4 className="mb-3">{character.name}</h4>
            <p>{character.description}</p>
            <p><i>{character.gender}, {character.age}</i></p>
        </div>
    );
};

export default CharacterCard;