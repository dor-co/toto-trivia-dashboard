import React, { useState, useEffect } from 'react';
import "firebase/firestore";
import { useFirestoreDocData, useFirestore, firestore } from "reactfire";
import firebase from 'firebase';
import './Style.css';
import logo from '../asserts/logos_a_logos_winner.png';
import TeamScore from './TeamScore';
import CrewScore from './CrewScore';

function Score() {
    const [renderCount, setRenderCount] = useState(0);
    
    const CurrentQuestionRef = useFirestore().collection("CurrentQuestion").doc("CurrentQuestion");
    const CurrentQuestionData = useFirestoreDocData(CurrentQuestionRef).data;

    const user1 = useFirestore().collection("Users").doc("1");
    const user1Data = useFirestoreDocData(user1).data;

    const question = useFirestore().collection("Question").doc("1CTj880EnpGboYwcmDiL").collection('Answers').doc('3.2');
    const questionData = useFirestoreDocData(question).data;
    const user2 = useFirestore().collection("Users").doc("2");
    const user2Data = useFirestoreDocData(user2).data;

    const [teams, setTeams] = useState([]);
	const [ID, setID] = useState([]);
	const temp = [];
	let ids = [];

    const [crews, setCrews] = useState([]);
	const [crewID, setCrewID] = useState([]);
	const tempCrew = [];
	let crewIds = [];

    useEffect(() => {
		ueCall()
	}, [])

	const db = firestore();

	const ueCall=async()=>{
		const userData = await db.collection('Teams').get();
			userData.forEach((doc) => {
				ids.push(doc.id);
				temp.push(doc.data());
			})
			setTeams(temp);
			setID(ids);

            const crewData = await db.collection('Crews').get();
			crewData.forEach((doc) => {
				crewIds.push(doc.id);
				tempCrew.push(doc.data());
			})
			setCrews(tempCrew);
			setCrewID(crewIds);
    }  
    
        const displayScoreRef = useFirestore().collection('Dashboard').doc('Dashboard');
        const displayScoreData = useFirestoreDocData(displayScoreRef).data;
        console.log('showscore', displayScoreData?.showScore)

        if(displayScoreData?.showScore === true){
            window.location.reload();
        }

    return (
        <div className='container'>
            <h1 className='dashboardTitle'>Dashboard <img className='logoImg' src={logo} /></h1>
            <h1>Current Question:</h1>
            <h1 className='currQues'>{CurrentQuestionData?.question}</h1><br />
            <h1>Score Tables:</h1><br/>
            <h3>Team's Score:</h3>
            {teams.map((item, index) => {
                    return (
                        <TeamScore
                            key={item.id}
                            item={item}
                            index={index}
                            id={ID[index]} />
                    )                    
			})}

            <br/><h3>Crew's Score:</h3>
            {crews.map((item, index) => {
                    return (
                        <CrewScore
                            key={item.id}
                            item={item}
                            index={index}
                            id={crewID[index]} />
                    )                    
			})}
        </div>
    );
}

export default Score;