import React from 'react';

const CharacterCard = ({character}) => {
    return (
        <div className="character my-2 pt-4">
            <h4>{character.name}</h4>
            <p>{character.description}</p>
            <p>{character.gender}, {character.age}</p>
        </div>
    );
};

export default CharacterCard;