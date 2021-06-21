import "./App.css";
import "firebase/firestore";
import Score from './components/Score';
import background from './asserts/grey-back.jpeg';

function App() {
	return (
		<>
			<img className="backgoundImg" alt='backgoundImage' src={background} style={{position: 'absolute', zIndex: -1, width: '100%', height: '200hv'}} />
				<div className="App">
					<Score />
			</div>
		</>
	);
}

export default App;
