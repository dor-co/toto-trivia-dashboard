import React from 'react';

function crewScore({ item, index, id }) {
    console.log(item)
    return (
        <div style={{textAlign: 'left', paddingLeft: 20, paddingTop: 5}}>
            <h1>{item.crew}: {item.Total.join(" ")}</h1>
        </div>
    );
}

export default crewScore;
