import { AminoAcid } from '../types/proteinTypes';
import {
	distance,
	doubleLine,
	drawOMinus,
	fontHeight,
	oneLine,
	tan30,
	tan36,
	text,
} from '../canvas/canvas';
import { drawAminoAcid } from '../canvas/drawAminoAcid';

export const CodonToAminoAcid: { [key: string]: string } = {
	UUU: 'F',
	UUC: 'F',
	UUA: 'L',
	UUG: 'L',
	UCU: 'S',
	UCC: 'S',
	UCA: 'S',
	UCG: 'S',
	UAU: 'Y',
	UAC: 'Y',
	UAA: 'STOP',
	UAG: 'STOP',
	UGU: 'C',
	UGC: 'C',
	UGA: 'STOP',
	UGG: 'W',
	CUU: 'L',
	CUC: 'L',
	CUA: 'L',
	CUG: 'L',
	CCU: 'P',
	CCC: 'P',
	CCA: 'P',
	CCG: 'P',
	CAU: 'H',
	CAC: 'H',
	CAA: 'Q',
	CAG: 'Q',
	CGU: 'R',
	CGC: 'R',
	CGA: 'R',
	CGG: 'R',
	AUU: 'I',
	AUC: 'I',
	AUA: 'I',
	AUG: 'M', // START
	ACU: 'T',
	ACC: 'T',
	ACA: 'T',
	ACG: 'T',
	AAU: 'N',
	AAC: 'N',
	AAA: 'K',
	AAG: 'K',
	AGU: 'S',
	AGC: 'S',
	AGA: 'R',
	AGG: 'R',
	GUU: 'V',
	GUC: 'V',
	GUA: 'V',
	GUG: 'V',
	GCU: 'A',
	GCC: 'A',
	GCA: 'A',
	GCG: 'A',
	GAU: 'D',
	GAC: 'D',
	GAA: 'E',
	GAG: 'E',
	GGU: 'G',
	GGC: 'G',
	GGA: 'G',
	GGG: 'G',
};

export const AminoAcids: Map<string, AminoAcid> = new Map([
	[
		'A',
		{
			letter: 'A',
			name: 'Alanine',
			code: 'ala',
			mass: 89.094,
			draw: drawAminoAcid.drawAla,
			netCharge: 0,
			sideChainPolarity: 'Nonpolar'
		},
	],
	[
		'C',
		{
			letter: 'C',
			name: 'Cysteine',
			code: 'cys',
			mass: 121.154,
			draw: drawAminoAcid.drawCys,
			netCharge: 0,
			sideChainPolarity: 'Brønsted acid'
		},
	],
	[
		'D',
		{
			letter: 'D',
			name: 'Aspartic Acid',
			code: 'asp',
			mass: 133.104,
			draw: drawAminoAcid.drawAsp,
			netCharge: -1,
			sideChainPolarity: 'Brønsted base'
		},
	],
	[
		'E',
		{
			letter: 'E',
			name: 'Glutamic Acid',
			mass: 147.131,
			code: 'glu',
			netCharge: -1,
			sideChainPolarity: 'Brønsted base'
		},
	],
	[
		'F',
		{
			letter: 'F',
			name: 'Phenylalanine',
			mass: 165.192,
			code: 'phe',
			netCharge: 0,
			sideChainPolarity: 'Nonpolar'
		},
	],
	[
		'G',
		{
			letter: 'G',
			name: 'Glycine',
			mass: 75.067,
			code: 'gly',
			draw: drawAminoAcid.drawGlu,
			netCharge: 0,
			sideChainPolarity: 'Nonpolar'
		},
	],
	[
		'H',
		{
			letter: 'H',
			name: 'Histidine',
			mass: 155.156,
			code: 'his',
			draw: drawAminoAcid.drawHis,
			netCharge: 0.1, // 10% positive 90% neutral
			sideChainPolarity: 'Brønsted acid and base'
		},
	],
	[
		'I',
		{
			letter: 'I',
			name: 'Isoleucine',
			mass: 131.175,
			code: 'ile',
			draw: drawAminoAcid.drawIle,
			netCharge: 0,
			sideChainPolarity: 'Nonpolar'
		},
	],
	[
		'K',
		{
			letter: 'K',
			name: 'Lysine',
			mass: 146.189,
			code: 'lys',
			draw: drawAminoAcid.drawLys,
			netCharge: 1,
			sideChainPolarity: 'Brønsted base'
		},
	],
	[
		'L',
		{
			//TODO: shape for discussion
			letter: 'L',
			name: 'Leucine',
			mass: 131.175,
			code: 'leu',
			draw: drawAminoAcid.drawLeu,
			netCharge: 0,
			sideChainPolarity: 'Nonpolar'
		},
	],
	[
		'M',
		{
			letter: 'M',
			name: 'Methionine',
			mass: 149.208,
			code: 'met',
			draw: drawAminoAcid.drawMet,
			netCharge: 0,
			sideChainPolarity: 'Nonpolar'
		},
	],
	[
		'N',
		{
			letter: 'N',
			name: 'Asparagine',
			mass: 132.119,
			code: 'asn',
			draw: drawAminoAcid.drawAsn,
			netCharge: 0,
			sideChainPolarity: 'Polar'
		},
	],
	[
		'P',
		{
			letter: 'P',
			name: 'Proline',
			mass: 115.132,
			code: 'pro',
			draw: drawAminoAcid.drawPro,
			netCharge: 0,
			sideChainPolarity: 'Nonpolar'
		},
	],
	[
		'Q',
		{
			letter: 'Q',
			name: 'Glutamine',
			mass: 146.146,
			code: 'gln',
			draw: drawAminoAcid.drawGln,
			netCharge: 0,
			sideChainPolarity: 'Polar'
		},
	],
	[
		'R',
		{
			letter: 'R',
			name: 'Arginine',
			mass: 174.203,
			code: 'arg',
			draw: drawAminoAcid.drawArg,
			netCharge: 1,
			sideChainPolarity: 'Basic polar'
		},
	],
	[
		'S',
		{
			letter: 'S',
			name: 'Serine',
			mass: 105.093,
			code: 'ser',
			draw: drawAminoAcid.drawSer,
			netCharge: 0,
			sideChainPolarity: 'Polar'
		},
	],
	[
		'T',
		{
			letter: 'T',
			name: 'Threonine',
			mass: 119.119,
			code: 'thr',
			draw: drawAminoAcid.drawThr,
			netCharge: 0,
			sideChainPolarity: 'Polar'
		},
	],
	[
		'U',
		{
			// Not on pepdraw
			letter: 'U',
			name: 'Selenocysteine',
			mass: 168.05,
			code: 'Sec',
			draw: drawAminoAcid.drawSec,
			netCharge: -1,
			sideChainPolarity: 'Polar'
		},
	],
	[
		'V',
		{
			letter: 'V',
			name: 'Valine',
			mass: 117.148,
			code: 'val',
			draw: drawAminoAcid.drawVal,
			netCharge: 0,
			sideChainPolarity: 'Nonpolar'
		},
	],
	[
		'W',
		{
			letter: 'W',
			name: 'Tryptophan',
			mass: 204.228,
			code: 'trp',
			draw: drawAminoAcid.drawTrp,
			netCharge: 0,
			sideChainPolarity: 'Nonpolar'
		},
	],
	[
		'Y',
		{
			letter: 'Y',
			name: 'Tyrosine',
			mass: 181.191,
			code: 'tyr',
			draw: drawAminoAcid.drawTyr,
			netCharge: 0,
			sideChainPolarity: 'Brønsted acid'
		},
	],
	['STOP', { letter: 'STOP', name: 'STOP' }],
]);
