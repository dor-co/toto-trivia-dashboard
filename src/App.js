import logo from "./logo.svg";
import "./App.css";
import "firebase/firestore";
import { useFirestoreDocData, useFirestore } from "reactfire";
import Score from './components/Score';

function CurrentQuestion() {
	const questionsRef = useFirestore().collection("Questions").doc("Question1");
	const currentQuestionRef = useFirestore().collection("CurrentQuestion").doc("CurrentQuestion");
	const questionsStatus = useFirestoreDocData(questionsRef).status;
	const questionsData = useFirestoreDocData(questionsRef).data;
	const currentQuestionStatus = useFirestoreDocData(currentQuestionRef).status;
	const currentQuestionData = useFirestoreDocData(currentQuestionRef).data;

	if ((currentQuestionStatus === "loading") || (questionsStatus === "loading"))  {
		return <p>Loading data...</p>;
	}
	return <p>The main question is: {currentQuestionData?.question}!</p>;
}

function App() {
	return (
		<div className="App">
			<Score />
		</div>
	);
}

export default App;
