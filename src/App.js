import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import ScorePage from './components/ScorePage';
import { makeWebSocketCall } from './utils/webSocketUtils';


function App() {

	const socket = useRef(null);
	const [parsedData, setParsedData] = useState({});

	useEffect(() => {
		socket.current = makeWebSocketCall();
		const wsocket = socket.current;

		wsocket.addEventListener('message', (event) => {
			if (event.data) {
				const parsedData = JSON.parse(event.data);
				setParsedData(parsedData);
			}
		});

		return () => {
			wsocket.close();
		};
	}, []);



	return (
		<ScorePage parsedData={parsedData}/>
	);
}

export default App;
