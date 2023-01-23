export type Codon = {
	threeLetterCode: string;
	aminoAcidLetter: string;
	isStart?: boolean;
	isStop?: boolean;
};

export type AminoAcid = {
	letter: string;
	name: string;
	// TODO: possibly add mass, charge, etc.
};
