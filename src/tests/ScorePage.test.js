import React from 'react';
import { render } from '@testing-library/react';
import ScorePage from '../components/ScorePage';
import { describe, expect, it } from '@jest/globals';
import { EVENT_TYPES } from '../utils/logigUtils';

describe('ScorePage component', () => {
	const parsedData = {
		events: [
			{ type: EVENT_TYPES.MATCH_STARTED },
			{ type: EVENT_TYPES.PERIOD_START, periodName: 'Set 1', homeScore: '0', awayScore: '0' },
			{ type: EVENT_TYPES.POINT, server: 'home', homeScore: '1', awayScore: '0' },
			{ type: EVENT_TYPES.PERIOD_SCORE, homeScore: '25', awayScore: '20' },
			{ type: EVENT_TYPES.PERIOD_START, periodName: 'Set 2', homeScore: '0', awayScore: '0' },
			{ type: EVENT_TYPES.POINT, server: 'away', homeScore: '1', awayScore: '1' },
			{ type: EVENT_TYPES.PERIOD_SCORE, homeScore: '23', awayScore: '25' },
			{ type: EVENT_TYPES.MATCH_ENDED }
		],
		clock: '2023-04-27T23:22:01.653Z'
	};

	it('renders the correct match state', () => {
		const { getByText } = render(<ScorePage parsedData={parsedData} />);
		expect(getByText('matchStarted')).toBeInTheDocument();
	});

	it('renders the current set correctly', () => {
		const { getByText } = render(<ScorePage parsedData={parsedData} />);
		expect(getByText('Current : Set 2')).toBeInTheDocument();
	});

	it('renders the clock component', () => {
		const { getByText } = render(<ScorePage parsedData={parsedData} />);
		expect(getByText('00:22:01')).toBeInTheDocument();
	});

	it('updates the scores correctly on point events', () => {
		const { getByText } = render(<ScorePage parsedData={parsedData} />);
		expect(getByText('25')).toBeInTheDocument();
	});

	it('updates the period scores correctly on period score events', () => {
		const { getByText } = render(<ScorePage parsedData={parsedData} />);
		expect(getByText('25')).toBeInTheDocument();
		expect(getByText('23')).toBeInTheDocument();
	});

	it('renders the winner correctly on match end event', () => {
		const { getByText } = render(<ScorePage parsedData={parsedData} />);
		expect(getByText('Winner Away')).toBeInTheDocument();
	});
});
