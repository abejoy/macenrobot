import React from 'react';
import PropTypes from 'prop-types';

const Clock = ({clock}) => {


	const formatTime = (clock) => {
		const time = new Date(Date.parse(clock));
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const seconds = time.getSeconds();

		const formattedHours = hours < 10 ? `0${hours}` : hours;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	};

	return (
		<div>
			<h2>{formatTime(clock)}</h2>
		</div>
	);
};

Clock.propTypes = {
	clock: PropTypes.string,
};

export default Clock;
