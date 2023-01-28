import { Codon } from '../types/proteinTypes';
import { AminoAcids, CodonToAminoAcid } from "./aminoAcids";
import { Protein } from '../types/proteinTypes';

// Regex for finding proteins in a string
// Matches every substring starting with AUG and ending with UAA, UAG or UGA
// (not containing any of these stop codons between start and end)
const PROTEIN_REGEX = /AUG(?:(?!UAA|UAG|UGA).)*(?:UAA|UAG|UGA)/g;

export const translate = (rna: string): [Codon[], Codon[], Codon[]] => {
	const result: [Codon[], Codon[], Codon[]] = [[], [], []];
	// 3 translations for 3 possible starts
	for (let i = 0; i < 3; i++) {
		for (let o = 0; o + i + 2 < rna.length; o += 3) {
			// Get 3 letters from RNA
			const codon = rna.slice(o + i, o + i + 3);
			// Replace each codon with a corresponding object
			result[i].push({
				threeLetterCode: codon,
				aminoAcidLetter: CodonToAminoAcid[codon],
			});
		}
	}
	return result;
};

export const findProteins = (
	aminoAcids: Codon[],
): {
	proteins: Protein[];
	formattedAminoAcidString: string;
	formattedAminoAcidLetterString: string;
} => {
	// Combination of three-letter codes representing amino acids in a string separated by spaces
	const aminoAcidString = aminoAcids
		.map(codon => codon.threeLetterCode)
		.join(' ');
	// Replace all proteins in the string with a span with a green background
	// Span properties need to be separated by some other character than space to avoid them being joined later with regex
	// Elements are sliced so STOP is not part of the green highlight
	const formattedAminoAcidString = aminoAcidString.replace(
		PROTEIN_REGEX,
		el => {
			return `<span
					class="green"
				>
					${el.slice(0, el.length - 3)}
				</span>${el.slice(el.length - 3)}`;
		},
	);
	// Combination of single-letter codes representing amino acids in a string
	// To extract the single-letter codes, replace all three-letter codes with their corresponding single-letter codes using regex
	const formattedAminoAcidLetterString = formattedAminoAcidString.replace(
		/[AUGC]{3}/g,
		codon => CodonToAminoAcid[codon],
	);
	// Find all proteins in the string
	const foundProteinMatches = aminoAcidString.match(PROTEIN_REGEX) ?? [];
	// Map each protein to an array of objects representing each codon
	const proteins = foundProteinMatches.map(match => {
		// Add 36 to account for the molecule ending the protein sequence and codon STOP (which is not any amino acid, so it does not weight anything)
		// (for better understanding look how structural forms are drawn)
		let mass = 36.0212;
		let netCharge = 0;
		const aminoAcidChain: Codon[] = match.split(' ').map(codon => {
			const aminoAcidLetter = CodonToAminoAcid[codon];
			// Subtract 18 to account for the molecule that is released when the peptide bond is formed
			mass += (AminoAcids.get(aminoAcidLetter)?.mass ?? 0) - 18.0106;
			netCharge += AminoAcids.get(aminoAcidLetter)?.netCharge ?? 0;
			return {
				threeLetterCode: codon,
				aminoAcidLetter
			};
		});
		return {
			aminoAcidChain,
			mass,
			netCharge,
		};
	});
	return {
		proteins,
		formattedAminoAcidString,
		formattedAminoAcidLetterString,
	};
};
