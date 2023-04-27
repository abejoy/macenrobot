import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableTennisPaddleBall } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


const Team = ({name, serving, periodScore, score, setWinners}) => {

	return (
		<div>
			<h1>
				{name} 
				{serving  && <FontAwesomeIcon icon={faTableTennisPaddleBall} style={{ marginRight: '8px' }} />}
			</h1>

			<h2>Period Score</h2>
			<h3>{periodScore}</h3>

			<h2>Current Score</h2>
			<h3>{score}</h3>


			{setWinners.map((item, index) => (
				<span key={index}>
					<h2>{item.set}</h2>
					<h3>{item.status}</h3>
				</span>
			))}


      
		</div>
	);
};

Team.propTypes = {
	name: PropTypes.string.isRequired,
	serving: PropTypes.bool.isRequired,
	periodScore: PropTypes.string.isRequired,
	score: PropTypes.string.isRequired,
	setWinners: PropTypes.array.isRequired
};

export default Team;
