import React from 'react';
import './Style.css';

function TeamScore({ item }) {
    return (
        <div style={{textAlign: 'center', paddingRight: 20, paddingTop: 5, direction: 'rtl', flexDirection: 'row', display: 'flex'}}>
            <h1 style={{width: '63%'}}>{item.title}: </h1> <span className='scoreField'>{item.score}</span>
        </div>
    );
}

export default TeamScore;
