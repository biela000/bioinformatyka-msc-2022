import { createSlice } from '@reduxjs/toolkit';
import { Codon } from "../../types/proteinTypes";
import { translate, findProteins } from "../../utils/translation";

type ProteinState = {
	translatedAminoAcids: [Codon[], Codon[], Codon[]];
	proteins: [Codon[][], Codon[][], Codon[][]];
};

const initialState: ProteinState = {
	translatedAminoAcids: [[], [], []],
	proteins: [[], [], []],
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
				state.proteins[i] = findProteins(state.translatedAminoAcids[i]);
			}
		},
		deleteProtein: (state, action) => {
			console.log('delete protein');
		},
	},
});

export const { addProtein, deleteProtein } = proteinSlice.actions;
export default proteinSlice.reducer;
