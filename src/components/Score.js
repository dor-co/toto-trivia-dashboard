import React, { useState, useEffect } from 'react';
import "firebase/firestore";
import { useFirestoreDocData, useFirestore, firestore } from "reactfire";
import firebase from 'firebase';
import './Style.css';
import logo from '../asserts/logos_a_logos_winner.png';
import TeamScore from './TeamScore';

function Score() {

    const [renderCount, setRenderCount] = useState(0);
    // const [currentId, setCurrentId] = useState();

    // const team1Ref = useFirestore().collection("Teams").doc("Developers");
    // const team1Data = useFirestoreDocData(team1Ref).data;
    // const staTeam1Data = useFirestoreDocData(team1Ref).data;

    // const team2Ref = useFirestore().collection("Teams").doc("Qa");
    // const team2Data = useFirestoreDocData(team2Ref).data;

    const CurrentQuestionRef = useFirestore().collection("CurrentQuestion").doc("CurrentQuestion");
    const CurrentQuestionData = useFirestoreDocData(CurrentQuestionRef).data;

    // const temp = useFirestore();

    const user1 = useFirestore().collection("Users").doc("1");
    const user1Data = useFirestoreDocData(user1).data;

    const question = useFirestore().collection("Question").doc("1CTj880EnpGboYwcmDiL").collection('Answers').doc('3.2');
    const questionData = useFirestoreDocData(question).data;
    // console.log(questionData?.isCorrect)
    const user2 = useFirestore().collection("Users").doc("2");
    const user2Data = useFirestoreDocData(user2).data;

    // if(questionData..user1Data.userAnswer.isCorrect == ture)

    // if (renderCount < 1) {
    //     setRenderCount(1);
    // }


    // let arr = [1,2,3,4,5,6,7,8,9,10];

    // for(let i = 0; i < 5 ; i++){
    //     for(let i = 0; i < 5 ; i++){
    //         console.log(arr)
    //     }

    // }











    //     temp.collection('Users').get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             if (doc.data().currentAnswer == CurrentQuestionData?.rightAnswer) {
    //                 console.log('enter1')
    //                 let originalDoc = doc;
    //                 let currentScore = doc.data().Score;
    //                 if (doc.data().job === 'Qa') {
    //                         console.log(currentScore)
    //                         console.log('yes')
    //                         temp.collection('Teams').doc('Qa').update({
    //                             Score: currentScore + CurrentQuestionData?.cost
    //                         })
                        
    //                 }
    //                 // temp.collection("Teams").doc(doc.data().job).get().then((doc) => {
    //                 //     console.log('enter2')
    //                 //     let currentScore = doc.data().Score;
    //                 //     temp.collection('Teams').doc(originalDoc.data().job).update({
    //                 //         Score: currentScore + CurrentQuestionData?.cost
    //                 //     }).then(() => {
    //                 //         console.log("Document successfully written!");
    //                 //     })
    //                 //         .catch((error) => {
    //                 //             console.error("Error writing document: ", error);
    //                 //         });
    //                 // }
    //                 // )
    //             }
    //         })
    //     })
    

    

    //console.log(teamRefData.Score+1)

    // const updateScore = () => {
    //     teamRef.update({
    //         Score: teamRefData.Score + 1
    //     })
    //         .then(() => {
    //             console.log("Document successfully written!");
    //         })
    //         .catch((error) => {
    //             console.error("Error writing document: ", error);
    //         });
    // }

    // const usRef = useFirestore().collection("Users").doc("1");
    // const usData = useFirestoreDocData(usRef).data;
    // const staData = useFirestoreDocData(usRef).status;

    // console.log(team1Data?.Total[2])
    // //console.log(usData?.userScore)

    // if (staData !== 'loading' && staTeam1Data !== 'loading') {
    //     //console.log(usData.userScore[0])
    //     //console.log(usData.userScore[1])
    //     //console.log(usData.userScore[2])
    //     let ans = 0;
    //     for (let i = 0; i < 3; i++) {
    //         ans = usData.userScore[i] + ans
            
            
    // }
    // let array= [1,2,3]
    // console.log(array)
    // team1Data.set({
    //     Total: array.cost
    // })
    //     .then(() => {
    //         console.log("Document successfully written!");
    //     })
    //     .catch((error) => {
    //         console.error("Error writing document: ", error);
    //     }).catch((error) => console.log('Error write data to prev question', error));

    const [teams, setUsers] = useState([]);
	const [ID, setID] = useState([]);
	const temp = [];
	let ids = [];

    useEffect(() => {
		usedefect()
	}, [])

	const db = firestore();

	const usedefect=async()=>{
		const userData = await db.collection('Teams').get();
			userData.forEach((doc) => {
				ids.push(doc.id);
				temp.push(doc.data());
			})
			setUsers(temp);
			setID(ids)
            
            // console.log(temp)
            // console.log(ids)
            // console.log(teams)
            // console.log(ID)
        }  
    


    return (
        <div className='container'>

            <h1 className='dashboardTitle'>Dashboard <img className='logoImg' src={logo} /></h1>
            <h1>Current Question:</h1>
            <h1 className='currQues'>{CurrentQuestionData?.question}</h1><br />
            <h1>Score Tables:</h1>
            {/* <p>{team1Ref.id}: {team1Data?.Score}</p>
            <p>{team2Ref.id}: {team2Data?.Score}</p> */}

            {/* <h3>user1: {user1Data?.userAnswer}</h3>
            <h3>user2: {user2Data?.userAnswer}</h3> */}

            
            {teams.map((item, index) => {
						return (
							<TeamScore
								key={item.id}
								item={item}
								index={index}
								id={ID[index]} />
						)
					})}
            





            {/* <table className='scoreTable'>
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
            </table> */}
        </div>
    );
}

export default Score;