import { createSlice } from '@reduxjs/toolkit';

// TODO: Check the translation validity
const translate = (rna: string): [string[], string[], string[]] => {
	const result: [string[], string[], string[]] = [[], [], []];
	// 3 translations for 3 possible starts
	for (let i = 0; i < 3; i++) {
		for (let o = 0; o + 2 < rna.length; o += 3) {
			// Get 3 letters from RNA
			const codon = rna.slice(o + i, o + i + 3);
			result[i].push(codon);
		}
	}
	return result;
};

type ProteinState = {
	possibleProteins?: [string[], string[], string[]];
};
const initialState: ProteinState = {};

export const proteinSlice = createSlice({
	name: 'protein',
	initialState: initialState,
	reducers: {
		addProtein: (state, action) => {
			//TODO: Add code to protein translation, replace codons with specific amino acids, pick proteins from the result

			// Replace T with U to make RNA out of potential DNA
			const rna = action.payload.replace(/T/g, 'U');

			// state = array of arrays of potential proteins
			state.possibleProteins = translate(rna);
		},
		deleteProtein: (state, action) => {
			state = {};
		},
	},
});

export const { addProtein, deleteProtein } = proteinSlice.actions;
export default proteinSlice.reducer;
