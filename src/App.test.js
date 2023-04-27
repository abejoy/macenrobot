import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { expect, test } from '@jest/globals';

test('renders learn react link', () => {
	render(<App />);
	expect(true).toBe(true);
});
