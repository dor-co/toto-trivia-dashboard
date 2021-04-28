import React, { useState, useEffect } from 'react';
import "firebase/firestore";
import { useFirestoreDocData, useFirestore, firestore } from "reactfire";
import './Style.css';
import logo from '../asserts/logos_a_logos_winner.png';
// import TeamScore from './TeamScore';
// import CrewScore from './CrewScore';

function Score() {
    
    const CurrentQuestionRef = useFirestore().collection("CurrentQuestion").doc("CurrentQuestion");
    const CurrentQuestionData = useFirestoreDocData(CurrentQuestionRef).data;

    const db = firestore();
    
    const dashboardRef = db.collection('Dashboard').doc('Dashboard');
    const dashboardRefData = useFirestoreDocData(dashboardRef).data;
    const colCount = dashboardRefData?.columnCounter;

    const [teams, setTeams] = useState([]);
	//const [ID, setID] = useState([]);
	// const temp = [];
	// let ids = [];

    const [crews, setCrews] = useState([]);
	// const [crewID, setCrewID] = useState([]);
	// const tempCrew = [];
	// let crewIds = [];

    const [questions, setQuestions] = useState([]);
	// const tempQuestions = [];

    const useItems = (itemType, callback, items) => {
        useEffect(() => {
            const fetchData = async () => {
                await db.collection(itemType).onSnapshot((snapshot) => {
                    let listItems = [];
                    listItems = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    callback(listItems);
                });
            };
            fetchData();
        }, []);
        return items;
    };
    
    useItems("Questions", setQuestions, questions);
    useItems("Crews", setCrews, crews);
    useItems("Teams", setTeams, teams);

    // useEffect(() => {
    //     ueCall()
    // }, [])

	// const ueCall=async()=>{
	// 	const userData = await db.collection('Teams').get();
    //     userData.forEach((doc) => {
    //         ids.push(doc.id);
    //         temp.push(doc.data());
    //     })
    //     setTeams(temp);
    //     setID(ids);

    //     const crewData = await db.collection('Crews').get();
    //     crewData.forEach((doc) => {
    //         crewIds.push(doc.id);
    //         tempCrew.push(doc.data());
    //     })
    //     setCrews(tempCrew);
    //     setCrewID(crewIds);

    //     const qu = await db.collection('Questions').get();
    //     qu.forEach((doc) => {
    //         tempQuestions.push(doc.data());
    //     })
    //     setQuestions(tempQuestions);
    // }  

    return (
        <div className='container'>
            <h1 className='dashboardTitle'>Dashboard <img className='logoImg' alt='logoImage' src={logo} /></h1>
            <h2 style={{color: '#fff', fontSize: 45, fontWeight: 300}}>ערב השקה - צוות טוטו</h2>
            <h1 style={{textDecoration: 'underline', direction: 'rtl'}}>שאלה נוכחית:</h1>
            <h1 className='currQues'>{CurrentQuestionData?.question}</h1><br />

            <h1 style={{textDecoration: 'underline', direction: 'rtl'}}>טבלת נקודות לפי צוותים:</h1> 
            <table style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', background: 'rgba(90, 90, 90, .82)', borderCollapse: 'collapse', textAlign: 'center', margin: '0 auto',width: '80%', direction: 'rtl', display: 'absolute' }}>
                <thead>
                    <tr>
                        <th style={{border: '3px solid #AAAAAA', width: 300, height: 50, color: '#f9cf03', fontSize: 30}}>צוות</th>
                        {questions.map((ques, index) => {
                            return(
                                <th style={{borderCollapse: 'collapse', height: 50, border: '3px solid #AAAAAA', color: '#f9cf03', fontSize: 30}}>Q{index + 1}</th>
                            );
                        })}
                        <th style={{ border: '3px solid #AAAAAA', width: 250, color: '#f9cf03', fontSize: 30}}>סה״כ</th>
                    </tr>
                </thead>
                <tbody>
                    {crews.map((item) => {
                        return (
                            <tr>
                                <td style={{height: 60, color: '#f9cf03', fontSize: 25, padding: 5, border: '3px solid #AAAAAA', fontWeight: 'bold'}}>{item.title}</td>

                                    {/* map of score */}
                                    {crews.map((el) => {
                                        return(
                                            <td style={{height: 60, color: '#fff', fontSize: 25, padding: 5, border: '3px solid #AAAAAA'}}>X</td>
                                        );
                                    })}

                                <td style={{height: 60, color: '#f9cf03', fontSize: 25, padding: 5, border: '3px solid #AAAAAA', fontWeight: 'bold'}}>{item.score}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br/>

            <h1 style={{textDecoration: 'underline', direction: 'rtl'}}>טבלת נקודות לפי קבוצות:</h1>
            <table style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', background: 'rgba(90, 90, 90, .82)', borderCollapse: 'collapse', textAlign: 'center', margin: '0 auto',width: '80%', direction: 'rtl', display: 'absolute' }}>
                <thead style={{border: '3px solid #AAAAAA'}}>
                    <tr>
                        <th style={{ border: '3px solid #AAAAAA', width: 300, height: 50, color: '#f9cf03', fontSize: 30}}>קבוצה</th>
                        {questions.slice(0, colCount).map((ques, index) => {
                            return(
                                <th style={{borderCollapse: 'collapse', height: 50, border: '3px solid #AAAAAA', color: '#f9cf03', fontSize: 30}}>Q{index + 1}</th>
                            );
                            
                        })}
                        <th style={{ border: '3px solid #AAAAAA', width: 250, color: '#f9cf03', fontSize: 30}}>סה״כ</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((item) => {
                        return (
                            <tr>
                                <td style={{height: 60, color: '#f9cf03', fontSize: 25, padding: 5, border: '3px solid #AAAAAA', fontWeight: 'bold'}}>{item.title}</td>
                                
                                {/* map of score */}
                                {teams.slice(0, colCount).map((el) => {
                                    return(
                                        <td style={{height: 60, color: '#fff', fontSize: 25, padding: 5, border: '3px solid #AAAAAA'}}>X</td>
                                    );
                                })}

                                <td style={{height: 60, color: '#f9cf03', fontSize: 25, padding: 5, border: '3px solid #AAAAAA', fontWeight: 'bold'}}>{item.score}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Score;