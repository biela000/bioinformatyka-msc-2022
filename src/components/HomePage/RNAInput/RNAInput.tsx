import React, { useState } from "react";
import classes from './RNAInput.module.scss';
import Button from '../../UI/Button/Button';
import { addProtein } from "../../../store/slices/proteinSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/storeHooks";

const RNA_REGEX = /^[AUGCT\s]*$/i;

function RNAInput() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [rna, setRna] = useState('');
	const isRnaValid = RNA_REGEX.test(rna);
	const handleRnaChange = (rna: string) => {
		// Check if given input only consists of
		// letters present in a normal RNA / DNA code
		setRna(rna);
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
		<React.Fragment>
			<textarea
				className={classes.input}
				onChange={e => {
					handleRnaChange(e.target.value);
				}}
				value={rna}
				placeholder="Enter RNA or DNA"
				data-testid="RNAInput"
			/>
			{!isRnaValid && <p>Invalid RNA</p>}
			<Button onClick={handleRnaSubmit} disabled={!isRnaValid}>GO</Button>
		</React.Fragment>
	);
}

export default RNAInput;
