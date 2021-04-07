import React from 'react';

function TeamScore({ item, index, id }) {
    console.log(item)
    return (
        <h1>{item.team}: {item.Score}</h1>
    );
}

export default TeamScore;
