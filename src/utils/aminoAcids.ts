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
			draw: drawAminoAcid.drawAla,
		},
	],
	[
		'C',
		{
			letter: 'C',
			name: 'Cysteine',
			code: 'cys',
			draw: drawAminoAcid.drawCys,
		},
	],
	[
		'D',
		{
			letter: 'D',
			name: 'Aspartic Acid',
			code: 'asp',
			draw: drawAminoAcid.drawAsp,
		},
	],
	['E', { letter: 'E', name: 'Glutamic Acid', code: 'glu' }],
	['F', { letter: 'F', name: 'Phenylalanine', code: 'phe' }],
	[
		'G',
		{
			letter: 'G',
			name: 'Glycine',
			code: 'gly',
			draw: drawAminoAcid.drawGlu,
		},
	],
	[
		'H',
		{
			letter: 'H',
			name: 'Histidine',
			code: 'his',
			draw: drawAminoAcid.drawHis,
		},
	],
	[
		'I',
		{
			letter: 'I',
			name: 'Isoleucine',
			code: 'ile',
			draw: drawAminoAcid.drawIle,
		},
	],
	[
		'K',
		{
			letter: 'K',
			name: 'Lysine',
			code: 'lys',
			draw: drawAminoAcid.drawLys,
		},
	],
	[
		'L',
		{
			//TODO: shape for discussion
			letter: 'L',
			name: 'Leucine',
			code: 'leu',
			draw: drawAminoAcid.drawLeu,
		},
	],
	[
		'M',
		{
			letter: 'M',
			name: 'Methionine',
			code: 'met',
			draw: drawAminoAcid.drawMet,
		},
	],
	[
		'N',
		{
			letter: 'N',
			name: 'Asparagine',
			code: 'asn',
			draw: drawAminoAcid.drawAsn,
		},
	],
	[
		'P',
		{
			letter: 'P',
			name: 'Proline',
			code: 'pro',
			draw: drawAminoAcid.drawPro,
		},
	],
	[
		'Q',
		{
			letter: 'Q',
			name: 'Glutamine',
			code: 'gln',
			draw: drawAminoAcid.drawGln,
		},
	],
	[
		'R',
		{
			letter: 'R',
			name: 'Arginine',
			code: 'arg',
			draw: drawAminoAcid.drawArg,
		},
	],
	[
		'S',
		{
			letter: 'S',
			name: 'Serine',
			code: 'ser',
			draw: drawAminoAcid.drawSer,
		},
	],
	[
		'T',
		{
			letter: 'T',
			name: 'Threonine',
			code: 'thr',
			draw: drawAminoAcid.drawThr,
		},
	],
	[
		'U',
		{
			// Not on pepdraw
			letter: 'U',
			name: 'Selenocysteine',
			code: 'Sec',
			draw: drawAminoAcid.drawSec,
		},
	],
	[
		'V',
		{
			letter: 'V',
			name: 'Valine',
			code: 'val',
			draw: drawAminoAcid.drawVal,
		},
	],
	[
		'W',
		{
			letter: 'W',
			name: 'Tryptophan',
			code: 'trp',
			draw: drawAminoAcid.drawTrp,
		},
	],
	[
		'Y',
		{
			letter: 'Y',
			name: 'Tyrosine',
			code: 'tyr',
			draw: drawAminoAcid.drawTyr,
		},
	],
	['STOP', { letter: 'STOP', name: 'STOP' }],
]);
