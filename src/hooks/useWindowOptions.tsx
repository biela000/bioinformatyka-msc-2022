import React, { useMemo, useState } from 'react';
import { Codon } from '../types/proteinTypes';

export default function useWindowOptions(chain: Codon[]) {
	console.log(chain);
	const { windowOptions, biggestPossibleWindow } = useMemo(() => {
		const allWindows = [21, 19, 17, 15, 13, 11, 9, 7, 5, 3];
		const biggestPossibleWindow = allWindows.find(window => chain.length >= window * 2) ?? 3;
		const biggestPossibleWindowIndex = allWindows.indexOf(biggestPossibleWindow);
		const windows = allWindows.slice(biggestPossibleWindowIndex);
		const windowOptions = windows.map((window, index) => <option key={index} value={window}>{window}</option>);
		return { windowOptions, biggestPossibleWindow };
	}, [chain]);

	const [window, setWindow] = useState(biggestPossibleWindow);

	const handleWindowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setWindow(parseInt(event.target.value));
	};

	return { windowOptions, window, handleWindowChange };
}