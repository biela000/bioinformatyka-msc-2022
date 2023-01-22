export type Codon = {
	threeLetterCode: string;
	aminoAcidLetter: string;
};

export type AminoAcid = {
	letter: string;
	name: string;
	// TODO: possibly add mass, charge, etc.
};
