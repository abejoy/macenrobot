import React, {useState, useEffect} from 'react';
import Clock from './Clock';
import Team from './Team';
import PropTypes from 'prop-types';


const EVENT_TYPES = Object.freeze({
	MATCH_CALLED: 'matchCalled',
	MATCH_STARTED: 'matchStarted',
	PERIOD_START: 'periodStart',
	POINT: 'point',
	PERIOD_SCORE: 'periodScore',
	MATCH_ENDED: 'matchEnded',
});

const ScorePage = ({parsedData}) => {

	const [message, setMessage] = useState({});
	const [matchState, setMatchState] = useState('');
	const [teamAServing, setTeamAServing] = useState(false);
	const [matchSet, setMatchSet] = useState('Set');
	const [teamAScore, setTeamAScore] = useState('');
	const [teamBScore, setTeamBScore] = useState('');
	const [teamAPeriodScore, setTeamAPeriodScore] = useState('');
	const [teamBPeriodScore, setTeamBPeriodScore] = useState('');
	const [teamASetWins, setTeamASetWins] = useState([]);
	const [teamBSetWins, setTeamBSetWins] = useState([]);
	const [winner, setWinner] = useState('');

	const [prevMatchSet, setPrevMatchSet] = useState('');


	useEffect(() => {
		if(parsedData !== message) {
			setMessage(parsedData);
			handleEvents(parsedData.events);
		}
	}, [parsedData]);


	const handleEvents = (events) => {
		if (events && Array.isArray(events) && events.length > 0) {
			events.forEach((event) => {
				switch (event.type) {
				case EVENT_TYPES.MATCH_CALLED:
				case EVENT_TYPES.MATCH_STARTED:
					setMatchState(event.type);
					break;
				case EVENT_TYPES.PERIOD_START:
					handlePeriodStart(event);
					break;
    
				case EVENT_TYPES.POINT:
					handlePoint(event);
					break;
    
				case EVENT_TYPES.PERIOD_SCORE:
					handlePeriod(event);
					break;
    
				case EVENT_TYPES.MATCH_ENDED:
					handleMatchEnded();
				}
			});
		}
	};

	const handleMatchEnded = () => {
		setWinner(handlePeriodStart());
	};

	const handlePoint = (event) => {
		setTeamAServing(event.server === 'home');
		setTeamAScore(event.homeScore);
		setTeamBScore(event.awayScore);
	};

	const handlePeriod = (event) => {
		setTeamAPeriodScore(event.homeScore);
		setTeamBPeriodScore(event.awayScore);
	};

	const handlePeriodStart = (event) => {
		if (teamAPeriodScore !== '' && teamBPeriodScore !== '') {
			// team a won
			const teamA = [...teamASetWins];
			const teamB = [...teamBSetWins];
			if (parseInt(teamAPeriodScore) > parseInt(teamBPeriodScore)) {
				teamA.push({set: prevMatchSet, status: 'Won'});
				teamB.push({set: prevMatchSet, status: 'Lost'});
			} else {
				teamA.push({set: prevMatchSet, status: 'Lost'});
				teamB.push({set: prevMatchSet, status: 'Won'});
			}

			setTeamASetWins(teamA);
			setTeamBSetWins(teamB);

		}

		if (event) {
			setMatchSet(event.periodName);
			setPrevMatchSet(event.periodName);
		}

		return `${parseInt(teamAPeriodScore) > parseInt(teamBPeriodScore) ? 'Home' : 'Away'}`;
	};


	return (
		<div className="App">
			<h1>{matchState}</h1>
			<h1>Current : {matchSet}</h1>
			<Clock clock={message.clock} />

			<div style={{display: 'flex', justifyContent: 'space-evenly'}} >
				<Team name={'Home'} serving={teamAServing} score={teamAScore} periodScore={teamAPeriodScore} setWinners={teamASetWins} />
				<Team name={'Away'} serving={!teamAServing} score={teamBScore} periodScore={teamBPeriodScore} setWinners={teamBSetWins} />
			</div>

			<div>
				{winner && (<h1>Winner {winner}</h1>)}
			</div>

		</div>
	);
};

ScorePage.propTypes = {
	parsedData: PropTypes.object.isRequired
};

export default ScorePage;
