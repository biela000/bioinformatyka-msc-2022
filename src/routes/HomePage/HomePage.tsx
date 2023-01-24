import React, {useState} from 'react';
import {addProtein} from '../../store/slices/proteinSlice';
import classes from './HomePage.module.scss';
import RNAInput from '../../components/HomePage/RNAInput/RNAInput';
import Button from '../../components/UI/Button/Button';
import {useAppDispatch, useAppSelector} from '../../store/storeHooks';
import {useNavigate} from 'react-router-dom';

const RNA_REGEX = /^[AUGCT]*$/i;

function HomePage() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const possibleProteins = useAppSelector(
		state => state.protein.translatedAminoAcids,
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
			setRna(rna);
		}
	};

	const handleRnaSubmit = () => {
		if (rna) {
			// TODO: Check if RNA is valid (i think it has to have length of 3n)
			dispatch(addProtein(rna));
			navigate('/result/1');
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
		</div>
	);
}

export default HomePage;
