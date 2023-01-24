import { createSlice } from '@reduxjs/toolkit';
import { Codon } from "../../types/proteinTypes";
import { translate, findProteins } from "../../utils/translation";

type ProteinState = {
	translatedAminoAcids: [Codon[], Codon[], Codon[]];
	proteins: [Codon[][], Codon[][], Codon[][]];
	formattedAminoAcidString: [string, string, string];
	formattedAminoAcidLetterString: [string, string, string]
};

const initialState: ProteinState = {
	translatedAminoAcids: [[], [], []],
	proteins: [[], [], []],
	formattedAminoAcidString: ['', '', ''],
	formattedAminoAcidLetterString: ['', '', '']
};

export const proteinSlice = createSlice({
	name: 'protein',
	initialState: initialState,
	reducers: {
		addProtein: (state, action) => {
			// Replace T with U to make RNA out of DNA
			const rna = action.payload.toUpperCase().replace(/T/g, 'U');

			// state.translatedAminoAcids = array of arrays of amino acids
			state.translatedAminoAcids = translate(rna);

			// state.proteins = array of arrays of proteins, protein = Codon[]
			for (let i = 0; i < state.translatedAminoAcids.length; i++) {
				const findProteinsResult = findProteins(state.translatedAminoAcids[i]);
				state.proteins[i] = findProteinsResult.proteins;
				state.formattedAminoAcidString[i] = findProteinsResult.formattedAminoAcidString.replace(/ /g, '');
				state.formattedAminoAcidLetterString[i] = findProteinsResult.formattedAminoAcidLetterString.replace(/ /g, '');
			}
		},
		deleteProtein: (state, action) => {
			console.log('delete protein');
		},
	},
});

export const { addProtein, deleteProtein } = proteinSlice.actions;
export default proteinSlice.reducer;
