import React, {useState} from "react";
import classes from './RNAInput.module.scss';
import Button from '../../UI/Button/Button';
import {addProtein} from "../../../store/slices/proteinSlice";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../store/storeHooks";
import FileInput from "../../UI/FileInput/FileInput";

const RNA_REGEX = /^[AUGCT\s]*$/i;

function RNAInput() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [rna, setRna] = useState('');
	let invalidMessage = ""
	const isRnaValid = RNA_REGEX.test(rna);

	const handleRnaChange = (rna: string) => {

		setRna(rna);
	};

	const handleRnaSubmit = () => {
		if (rna) {
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
			<FileInput acceptedExtensions={["txt"]} onInput={event => {
				const input = event.target as HTMLInputElement;
				input.files![0].text().then(value => {handleRnaChange(value)})
			}} />
			{!isRnaValid && <p>{invalidMessage}</p>}
			<Button onClick={handleRnaSubmit} disabled={!isRnaValid}>GO</Button>
		</React.Fragment>
	);
}

export default RNAInput;
