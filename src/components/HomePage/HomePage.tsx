import React, { useState } from 'react';
import { addProtein } from '../../store/slices/proteinSlice';
import classes from './HomePage.module.scss';
import RNAInput from './RNAInput/RNAInput';
import Button from '../UI/Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import PossibleProteinDisplay from './PossibleProteinDisplay/PossibleProteinDisplay';

const RNA_REGEX = /^[AUGCT]*$/i;

function HomePage() {
	const dispatch = useAppDispatch();
	const possibleProteins = useAppSelector(
		state => state.protein.possibleProteins,
	);
	// STATE DEFINITIONS
	const [showInput, setShowInput] = useState(false);
	const [rna, setRna] = useState('');

	// EVENT HANDLERS
	const handleShowInput = () => {
		setShowInput(true);
	};

	const handleRnaChange = (rna: string) => {
		// Check if given input only consists of
		// letters present in a normal RNA / DNA code
		if (RNA_REGEX.test(rna)) {
			setRna(rna.toUpperCase());
		}
	};

	const handleRnaSubmit = () => {
		if (rna) {
			// TODO: Check if RNA is valid (i think it has to have length of 3n)
			dispatch(addProtein(rna));
		} else {
			// TODO: Show error message
		}
	};

	return (
		<div className={classes.container} data-testid="HomePageComponent">
			<h2 className={classes['welcome-heading']}>
				Welcome to This Protein Site, where you can see what proteins
				could be created from the RNA you provide.
			</h2>
			{!showInput && (
				<Button dataTestId="goButton" onClick={handleShowInput}>
					GO
				</Button>
			)}
			{showInput && (
				<RNAInput
					onInput={handleRnaChange}
					value={rna}
					onSubmit={handleRnaSubmit}
				/>
			)}
			{possibleProteins &&
				possibleProteins.map((protein, i) => {
					return <PossibleProteinDisplay protein={protein} key={i} />;
				})}
		</div>
	);
}

export default HomePage;
