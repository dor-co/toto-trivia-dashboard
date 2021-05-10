import React, { useState, useEffect } from "react";
import "firebase/firestore";
import { useFirestoreDocData, useFirestore, firestore } from "reactfire";
import "./Style.css";
import logo from "../asserts/logos_a_logos_winner.png";

function Score() {
	const CurrentQuestionRef = useFirestore().collection("CurrentQuestion").doc("CurrentQuestion");
	const CurrentQuestionData = useFirestoreDocData(CurrentQuestionRef).data;

	const db = firestore();

	const dashboardRef = db.collection("Dashboard").doc("Dashboard");
	const dashboardRefData = useFirestoreDocData(dashboardRef).data;
	const colCount = dashboardRefData?.columnCounter;

	const [teams, setTeams] = useState([]);
	const [crews, setCrews] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [topUsers, setTopUsers] = useState([]);

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
	useItems("Users", setTopUsers, topUsers);

	const getCrewsScore = () => {
		var score = crews.map((c) => {
			return {
				id: c.id,
				title: c.title,
				questions: questions.map((q) => {
					var rightAnswer = q?.answers.filter((a) => a.isCorrect)[0];
					var crewUsers = topUsers.filter((u) => u.crewId === c.id);
					var crewUsersCorrectAnswers = [];
					crewUsers.forEach((cu) => {
						var ri = cu.AQ?.filter((aq) => {
							return aq.ques === q.id && aq.ans.trim() === rightAnswer.answer.trim();
						});

						ri = ri.map((aq) => {
							return {
								...aq,
								price: rightAnswer.price,
							};
						});
						crewUsersCorrectAnswers.push(...ri);
					});

					var crewUserCorrectAnswersPrice = crewUsersCorrectAnswers?.reduce((price, item) => price + item.price, 0);
					return crewUserCorrectAnswersPrice;
				}),
			};
		});
		return score;
	};

	const getTeamsScore = () => {
		var score = teams.map((c) => {
			return {
				id: c.id,
				title: c.title,
				questions: questions.map((q) => {
					var rightAnswer = q?.answers.filter((a) => a.isCorrect)[0];
					var crewUsers = topUsers.filter((u) => u.teamId === c.id);
					var crewUsersCorrectAnswers = [];
					crewUsers.forEach((cu) => {
						var ri = cu.AQ?.filter((aq) => {
							return aq.ques === q.id && aq.ans.trim() === rightAnswer.answer.trim();
						});

						ri = ri.map((aq) => {
							return {
								...aq,
								price: rightAnswer.price,
							};
						});
						crewUsersCorrectAnswers.push(...ri);
					});

					var crewUserCorrectAnswersPrice = crewUsersCorrectAnswers?.reduce((price, item) => price + item.price, 0);
					return crewUserCorrectAnswersPrice;
                    
				}),
            
			};
		});
		return score;
	};

	const getUserScore = () => {
		var score = topUsers.map((user) => {
			return {
				firstName: user.firstName,
				questions: questions.map((q) => {
					var rightAnswer = q?.answers.filter((a) => a.isCorrect)[0];
					return user.AQ?.filter((aq) => {
						return aq.ques === q.id && aq.ans.trim() === rightAnswer.answer.trim();
					})
						.map((aq) => {
							return {
								...aq,
								price: rightAnswer.price,
							};
						})
						.reduce((price, item) => price + item.price, 0);
				}),
			};
		});
		return score;
	};

	var crewScores = getCrewsScore();
	var teamsScores = getTeamsScore();
	var userScores = getUserScore();

	return (
		<div className="container">
			<h1 className="dashboardTitle">
				Dashboard <img className="logoImg" alt="logoImage" src={logo} />
			</h1>
			<div className="headerDiv">
				<h2 className="totoTeamTitle">ערב השקה - צוות טוטו</h2>
				<h2 className="topPlayers">שחקנים מובילים:</h2>
				<div className="topPlayersList">
					{topUsers

						.sort((a, b) => b.score - a.score)
						.slice(0, 3)
						.map((el) => {
							return <>{el.score !== 0 ? <h2>{el.firstName}</h2> : null}</>;
						})}
					<br />
				</div>
			</div>
			<h1 className="curQues">שאלה נוכחית:</h1>
			<h1 className="currQues">{CurrentQuestionData?.question}</h1>
			<br />
			<h1 className="teamsHeader">טבלת נקודות לפי צוותים:</h1>
			<table className="tables">
				<thead className="theadStyle">
					<tr>
						<th className="groupsNames">צוות</th>
						{questions.map((ques, index) => {
							return <th className="numQues">Q{index + 1}</th>;
						})}
						<th className='total'>סה״כ</th>
					</tr>
				</thead>
				<tbody>
					{crewScores.map((item) => {
						return (
							<tr>
								<td className='titles'>{item.title}</td>

								{item.questions.map((el, index) => {
									return <td className='score'>{el}</td>;
								})}

								<td className='totalScore'>{item.questions.reduce((total, item) => total + item, 0)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<br />

			<h1 className="teamsHeader">טבלת נקודות לפי קבוצות:</h1>
			<table className="tables">
				<thead className="theadStyle">
					<tr>
						<th className="groupsNames">קבוצה</th>
						{questions.map((ques, index) => {
							return <th className="numQues">Q{index + 1}</th>;
						})}
						<th className='total'>סה״כ</th>
					</tr>
				</thead>
				<tbody>
					{teamsScores.map((item) => {
						return (
							<tr>
								<td className='titles'>{item.title}</td>

								{item.questions.map((el, index) => {
									return colCount > index ? (
										<td className='score'>{el}</td>
									) : (
										<td className='score'>???</td>
									);
								})}

								<td className='totalScore'>{item.questions.slice(0, colCount).reduce((total, item) => total + item, 0)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<h1 className="teamsHeader">טבלת נקודות לפי אנשים:</h1>
			<table className="tables">
				<thead className="theadStyle">
					<tr>
						<th className="groupsNames">משתמש</th>
						{questions.map((ques, index) => {
							return <th className="numQues">Q{index + 1}</th>;
						})}
						<th className='total'>סה״כ</th>
					</tr>
				</thead>
				<tbody>
					{userScores.map((item) => {
						return (
							<tr>
								<td className='titles'>{item.firstName}</td>

								{item.questions.map((el, index) => {
									return colCount > index ? (
										<td className='score'>{el}</td>
									) : (
										<td className='score'>???</td>
									);
								})}

								<td className='totalScore'>{item.questions.slice(0, colCount).reduce((total, item) => total + item, 0)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Score;
