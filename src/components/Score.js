import React from 'react';
import "firebase/firestore";
import { useFirestoreDocData, useFirestore } from "reactfire";
import firebase from 'firebase';
import './Style.css';

function Score() {

    const team1Ref = useFirestore().collection("Teams").doc("Developers");

    const team1Data = useFirestoreDocData(team1Ref).data;

    const team2Ref = useFirestore().collection("Teams").doc("Qa");
    const team2Data = useFirestoreDocData(team2Ref).data;

    return (
        <div className='container'>
            <h1 className='dashboardTitle'>Dashboard</h1>
            <h1>Score:</h1>
            <p>{team1Ref.id}: {team1Data?.Score}</p>
            <p>{team2Ref.id}: {team2Data?.Score}</p>

            <table className='scoreTable'>
                <tr className='headerTable'>
                    <th>Score</th>
                    <th>Team</th>
                </tr>
                <tr className='rowsTable'>
                    <td>{team1Data?.Score}</td>
                    <td>{team1Ref.id}</td>
                </tr>
                <tr className='rowsTable'>
                    <td>{team2Data?.Score}</td>
                    <td>{team2Ref?.id}</td>
                </tr>
            </table>
        </div>
    );
}

export default Score;