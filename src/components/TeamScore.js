import React from 'react';

function TeamScore({ item, index, id }) {
    console.log(item)
    return (
        <div style={{textAlign: 'left', paddingLeft: 20, paddingTop: 5}}>
            <h1>{item.team}: {item.Total.join(" ")}</h1>
        </div>
    );
}

export default TeamScore;
