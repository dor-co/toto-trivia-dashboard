import React from 'react';
import "firebase/firestore";
import { useFirestoreDocData, useFirestore } from "reactfire";
import firebase from 'firebase';
import './Style.css';
import logo from '../asserts/logos_a_logos_winner.png';

function Score() {

    const team1Ref = useFirestore().collection("Teams").doc("Developers");

    const team1Data = useFirestoreDocData(team1Ref).data;

    const team2Ref = useFirestore().collection("Teams").doc("Qa");
    const team2Data = useFirestoreDocData(team2Ref).data;

    const CurrentQuestionRef = useFirestore().collection("CurrentQuestion").doc("CurrentQuestion");
    const CurrentQuestionData = useFirestoreDocData(CurrentQuestionRef).data;

    return (
        <div className='container'>

            <h1 className='dashboardTitle'>Dashboard <img className='logoImg' src={logo} /></h1>
            <h1>Current Question:</h1>
            <h1 className='currQues'>{CurrentQuestionData?.question}</h1><br />
            <h1>Score Tables:</h1>
            {/* <p>{team1Ref.id}: {team1Data?.Score}</p>
            <p>{team2Ref.id}: {team2Data?.Score}</p> */}

            <table className='scoreTable'>
                <tr className='headerTable'>
                    <th style={{ color: '#F3CB05' }}>Total</th>
                    <td>Q15</td>
                    <td>Q14</td>
                    <td>Q13</td>
                    <td>Q12</td>
                    <td>Q11</td>
                    <td>Q10</td>
                    <td>Q9</td>
                    <td>Q8</td>
                    <td>Q7</td>
                    <td>Q6</td>
                    <td>Q5</td>
                    <td>Q4</td>
                    <td>Q3</td>
                    <td>Q2</td>
                    <td>Q1</td>
                    <th>Team</th>
                </tr>
                <tr className='rowsTable'>
                    <td>{team1Data?.Score}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{team1Ref.id}</td>
                </tr>
                <tr className='rowsTable'>
                    <td>{team2Data?.Score}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{team2Ref?.id}</td>
                </tr>
            </table>

            <table className='scoreTable'>
                <tr className='headerTable'>
                    <th style={{ color: '#F3CB05' }}>Total</th>
                    <td>Q15</td>
                    <td>Q14</td>
                    <td>Q13</td>
                    <td>Q12</td>
                    <td>Q11</td>
                    <td>Q10</td>
                    <td>Q9</td>
                    <td>Q8</td>
                    <td>Q7</td>
                    <td>Q6</td>
                    <td>Q5</td>
                    <td>Q4</td>
                    <td>Q3</td>
                    <td>Q2</td>
                    <td>Q1</td>
                    <th>Group</th>
                </tr>
                <tr className='rowsTable'>
                    <td>{team1Data?.Score}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{team1Ref.id}</td>
                </tr>
                <tr className='rowsTable'>
                    <td>{team2Data?.Score}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{team2Ref?.id}</td>
                </tr>
            </table>
        </div>
    );
}

export default Score;