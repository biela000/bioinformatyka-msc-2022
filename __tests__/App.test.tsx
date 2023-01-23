import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import userEvent from '@testing-library/user-event';

describe('App component', () => {
	it('should be rendered', () => {
		render(<App />);
		expect(screen.getByTestId('AppComponent')).toBeTruthy();
	});
	it('should render the HomePage component', () => {
		render(<App />);
		expect(screen.getByTestId('HomePageComponent')).toBeTruthy();
	});
	it('should render the RNAInput component after clicking the go button', () => {
		render(<App />);
		expect(screen.getByTestId('goButton')).toBeTruthy();
		// Click the button to show the RNA input
		userEvent.click(screen.getByTestId('goButton'));
		expect(screen.getByTestId('RNAInput')).toBeTruthy();
	});
	it('should only allow the user to enter A, C, G, U or T', () => {
		render(<App />);
		// Click the button to show the RNA input
		userEvent.click(screen.getByTestId('goButton'));
		// Enter a valid RNA sequence
		userEvent.type(screen.getByTestId('RNAInput'), 'AUGCTaugct');
		expect(screen.getByTestId('RNAInput')).toHaveValue('AUGCTaugct');
		// Enter an invalid RNA sequence
		userEvent.clear(screen.getByTestId('RNAInput'));
		userEvent.type(
			screen.getByTestId('RNAInput'),
			'BDEFHIJKLMNOPQRSWVXYZ1234567890!@#$%^&*()_+|:<>?',
		);
		expect(screen.getByTestId('RNAInput')).toHaveValue('');
	});
});
