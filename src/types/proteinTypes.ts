export type Codon = {
	threeLetterCode: string;
	aminoAcidLetter: string;
};

export type AminoAcid = {
	hydropathyIndex?: number;
	sideChainPolarity?: string;
	netCharge?: number;
	letter: string;
	name: string;
	code?: string;
	mass?: number;
	// TODO: possibly add mass, charge, etc.

	draw?: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		inverted: boolean,
	) => void;
};

export type Protein = {
	aminoAcidChain: Codon[];
	mass: number;
	netCharge: number;
};
