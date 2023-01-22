import { createSlice } from '@reduxjs/toolkit';
import { Codon } from '../../types/proteinTypes';
import { AminoAcidMap } from '../../utils/aminoAcids';

// TODO: Check the translation validity
const splitProteins = (rna: string): [string[], string[], string[]] => {
	const result: [string[], string[], string[]] = [[], [], []];
	// 3 translations for 3 possible starts
	for (let i = 0; i < 3; i++) {
		for (let o = 0; o + i + 2 < rna.length; o += 3) {
			// Get 3 letters from RNA
			const codon = rna.slice(o + i, o + i + 3);
			result[i].push(codon);
		}
	}
	return result;
};
const translateProteins = (splitProteins: string[]) : Codon[] => {
	return splitProteins.map(
		codon => {
			return {
				threeLetterCode: codon,
				aminoAcidLetter: AminoAcidMap[codon],
			};
		},
	);
}

type ProteinState = {
	possibleProteins?: [Codon[], Codon[], Codon[]];
};
const initialState: ProteinState = {};

export const proteinSlice = createSlice({
	name: 'protein',
	initialState: initialState,
	reducers: {
		addProtein: (state, action) => {
			//TODO: pick proteins from the result

			// Replace T with U to make RNA out of potential DNA
			const rna = action.payload.replace(/T/g, 'U');

			// state = array of arrays of potential proteins
			const possibileProteinsStrings = splitProteins(rna);
			state.possibleProteins = [[], [], []];
			for (let i = 0; i < possibileProteinsStrings.length; i++) {
				state.possibleProteins[i] = translateProteins(possibileProteinsStrings[i]);
			}
		},
		deleteProtein: (state, action) => {
			state = {};
		},
	},
});

export const { addProtein, deleteProtein } = proteinSlice.actions;
export default proteinSlice.reducer;
