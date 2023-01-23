import { Codon } from '../types/proteinTypes';
import { AminoAcidMap } from './aminoAcids';

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
				aminoAcidLetter: AminoAcidMap[codon],
			});
		}
	}
	return result;
};

export const findProteins = (aminoAcids: Codon[]): Codon[][] => {
	let originalIndex = 0;
	const result: Codon[][] = [];
	let aminoAcidsCpy = [...aminoAcids];
	for (
		// Protein starts with the earliest occurrence of M (start)
		let startIndex = aminoAcidsCpy.findIndex(
			codon => codon.aminoAcidLetter === 'M',
		);
		// If there is no M, there is no protein
		startIndex !== -1;
		// Find the next M
		startIndex = aminoAcidsCpy.findIndex(
			codon => codon.aminoAcidLetter === 'M',
		)
	) {
		// Find stop only in the remaining part of the RNA after the start
		originalIndex += startIndex;
		aminoAcids[originalIndex].isStart = true;
		aminoAcidsCpy = aminoAcidsCpy.slice(startIndex);
		const stopIndex = aminoAcidsCpy.findIndex(
			codon => codon.aminoAcidLetter === 'STOP',
		);
		// Protein must have a stop
		if (stopIndex === -1) {
			break;
		}
		originalIndex += stopIndex;
		aminoAcids[originalIndex].isStop = true;
		// 0 is now the index of M
		const protein = aminoAcidsCpy.slice(0, stopIndex);
		result.push(protein);
		// Remove the protein from the array
		aminoAcidsCpy = aminoAcidsCpy.slice(stopIndex + 1);
		originalIndex++;
	}
	return result;
};
