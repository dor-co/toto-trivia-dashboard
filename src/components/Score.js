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
			<div style={{ display: "flex", flexDirection: "row", textAlign: "center", justifyContent: "center", direction: "rtl" }}>
				<h2 style={{ color: "#fff", fontSize: 45, fontWeight: 300 }}>ערב השקה - צוות טוטו</h2>
				<h2 style={{ color: "#000", fontSize: 35, position: "absolute", left: 0, marginLeft: 100, marginTop: 40 }}>שחקנים מובילים:</h2>
				<div style={{ color: "#000", fontSize: 20, position: "absolute", left: 0, marginLeft: 180, paddingTop: 30, marginTop: 40 }}>
					{topUsers

						.sort((a, b) => b.score - a.score)
						.slice(0, 3)
						.map((el) => {
							return <>{el.score !== 0 ? <h2>{el.firstName}</h2> : null}</>;
						})}
					<br />
				</div>
			</div>
			<h1 style={{ textDecoration: "underline", direction: "rtl" }}>שאלה נוכחית:</h1>
			<h1 className="currQues">{CurrentQuestionData?.question}</h1>
			<br />
			<h1 style={{ textDecoration: "underline", direction: "rtl", marginTop: 40 }}>טבלת נקודות לפי צוותים:</h1>
			<table
				style={{
					boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
					background: "rgba(90, 90, 90, .82)",
					borderCollapse: "collapse",
					textAlign: "center",
					margin: "0 auto",
					width: "80%",
					direction: "rtl",
					display: "absolute",
				}}>
				<thead>
					<tr>
						<th style={{ border: "3px solid #AAAAAA", width: 300, height: 50, color: "#f9cf03", fontSize: 30 }}>צוות</th>
						{questions.map((ques, index) => {
							return <th style={{ borderCollapse: "collapse", height: 50, border: "3px solid #AAAAAA", color: "#f9cf03", fontSize: 30 }}>Q{index + 1}</th>;
						})}
						<th style={{ border: "3px solid #AAAAAA", width: 250, color: "#f9cf03", fontSize: 30 }}>סה״כ</th>
					</tr>
				</thead>
				<tbody>
					{crewScores.map((item) => {
						return (
							<tr>
								<td style={{ height: 60, color: "#f9cf03", fontSize: 25, padding: 5, border: "3px solid #AAAAAA", fontWeight: "bold" }}>{item.title}</td>

								{/* map of score */}
								{item.questions.map((el, index) => {
									return <td style={{ height: 60, color: "#fff", fontSize: 25, padding: 5, border: "3px solid #AAAAAA" }}>{el}</td>;
								})}

								<td style={{ height: 60, color: "#f9cf03", fontSize: 25, padding: 5, border: "3px solid #AAAAAA", fontWeight: "bold" }}>{item.questions.reduce((total, item) => total + item, 0)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<br />

			<h1 style={{ textDecoration: "underline", direction: "rtl" }}>טבלת נקודות לפי קבוצות:</h1>
			<table
				style={{
					boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
					background: "rgba(90, 90, 90, .82)",
					borderCollapse: "collapse",
					textAlign: "center",
					margin: "0 auto",
					width: "80%",
					direction: "rtl",
					display: "absolute",
				}}>
				<thead style={{ border: "3px solid #AAAAAA" }}>
					<tr>
						<th style={{ border: "3px solid #AAAAAA", width: 300, height: 50, color: "#f9cf03", fontSize: 30 }}>קבוצה</th>
						{questions.map((ques, index) => {
							return <th style={{ borderCollapse: "collapse", height: 50, border: "3px solid #AAAAAA", color: "#f9cf03", fontSize: 30 }}>Q{index + 1}</th>;
						})}
						<th style={{ border: "3px solid #AAAAAA", width: 250, color: "#f9cf03", fontSize: 30 }}>סה״כ</th>
					</tr>
				</thead>
				<tbody>
					{teamsScores.map((item) => {
						return (
							<tr>
								<td style={{ height: 60, color: "#f9cf03", fontSize: 25, padding: 5, border: "3px solid #AAAAAA", fontWeight: "bold" }}>{item.title}</td>

								{/* map of score */}
								{item.questions.map((el, index) => {
									return colCount > index ? (
										<td style={{ height: 60, color: "#fff", fontSize: 25, padding: 5, border: "3px solid #AAAAAA" }}>{el}</td>
									) : (
										<td style={{ height: 60, color: "#fff", fontSize: 25, padding: 5, border: "3px solid #AAAAAA" }}>???</td>
									);
								})}

								<td style={{ height: 60, color: "#f9cf03", fontSize: 25, padding: 5, border: "3px solid #AAAAAA", fontWeight: "bold" }}>{item.questions.slice(0, colCount).reduce((total, item) => total + item, 0)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<h1 style={{ textDecoration: "underline", direction: "rtl" }}>טבלת נקודות לפי אנשים:</h1>
			<table
				style={{
					boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
					background: "rgba(90, 90, 90, .82)",
					borderCollapse: "collapse",
					textAlign: "center",
					margin: "0 auto",
					width: "80%",
					direction: "rtl",
					display: "absolute",
				}}>
				<thead style={{ border: "3px solid #AAAAAA" }}>
					<tr>
						<th style={{ border: "3px solid #AAAAAA", width: 300, height: 50, color: "#f9cf03", fontSize: 30 }}>משתמש</th>
						{questions.map((ques, index) => {
							return <th style={{ borderCollapse: "collapse", height: 50, border: "3px solid #AAAAAA", color: "#f9cf03", fontSize: 30 }}>Q{index + 1}</th>;
						})}
						<th style={{ border: "3px solid #AAAAAA", width: 250, color: "#f9cf03", fontSize: 30 }}>סה״כ</th>
					</tr>
				</thead>
				<tbody>
					{userScores.map((item) => {
						return (
							<tr>
								<td style={{ height: 60, color: "#f9cf03", fontSize: 25, padding: 5, border: "3px solid #AAAAAA", fontWeight: "bold" }}>{item.firstName}</td>

								{/* map of score */}
								{item.questions.map((el, index) => {
									return colCount > index ? (
										<td style={{ height: 60, color: "#fff", fontSize: 25, padding: 5, border: "3px solid #AAAAAA" }}>{el}</td>
									) : (
										<td style={{ height: 60, color: "#fff", fontSize: 25, padding: 5, border: "3px solid #AAAAAA" }}>???</td>
									);
								})}

								<td style={{ height: 60, color: "#f9cf03", fontSize: 25, padding: 5, border: "3px solid #AAAAAA", fontWeight: "bold" }}>{item.questions.slice(0, colCount).reduce((total, item) => total + item, 0)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Score;
