import React, {useState} from 'react';
import classes from './HomePage.module.scss';
import RNAInput from '../../components/HomePage/RNAInput/RNAInput';
import Button from '../../components/UI/Button/Button';


function HomePage() {
	// STATE DEFINITIONS
	const [showInput, setShowInput] = useState(false);

	// EVENT HANDLERS
	const handleShowInput = () => {
		setShowInput(true);
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
				<RNAInput />
			)}
		</div>
	);
}

export default HomePage;
