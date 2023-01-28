import { AminoAcid } from "../types/proteinTypes";
import Canvas from "../components/Canvas/Canvas";
import {distance, doubleLine, drawBase, drawOMinus, fontHeight, oneLine, tan30, tan36, text} from "./canvas";

export const CodonToAminoAcid: { [key: string]: string } = {
	UUU: "F",
	UUC: "F",
	UUA: "L",
	UUG: "L",
	UCU: "S",
	UCC: "S",
	UCA: "S",
	UCG: "S",
	UAU: "Y",
	UAC: "Y",
	UAA: "STOP",
	UAG: "STOP",
	UGU: "C",
	UGC: "C",
	UGA: "STOP",
	UGG: "W",
	CUU: "L",
	CUC: "L",
	CUA: "L",
	CUG: "L",
	CCU: "P",
	CCC: "P",
	CCA: "P",
	CCG: "P",
	CAU: "H",
	CAC: "H",
	CAA: "Q",
	CAG: "Q",
	CGU: "R",
	CGC: "R",
	CGA: "R",
	CGG: "R",
	AUU: "I",
	AUC: "I",
	AUA: "I",
	AUG: "M", // START
	ACU: "T",
	ACC: "T",
	ACA: "T",
	ACG: "T",
	AAU: "N",
	AAC: "N",
	AAA: "K",
	AAG: "K",
	AGU: "S",
	AGC: "S",
	AGA: "R",
	AGG: "R",
	GUU: "V",
	GUC: "V",
	GUA: "V",
	GUG: "V",
	GCU: "A",
	GCC: "A",
	GCA: "A",
	GCG: "A",
	GAU: "D",
	GAC: "D",
	GAA: "E",
	GAG: "E",
	GGU: "G",
	GGC: "G",
	GGA: "G",
	GGG: "G"
};

export const AminoAcids: Map<string, AminoAcid> = new Map([
	["A", {
		letter: "A",
		name: "Alanine",
		draw: (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
			if (inverted) {
				oneLine(ctx, x, y, x, y - distance);
			} else {
				oneLine(ctx, x, y, x, y + distance);
			}
		}
	}],
	["C", {
		letter: "C",
		name: "Cysteine",
		draw: (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
			if (inverted) {
				[x, y] = oneLine(ctx, x, y, x + distance * (1 - tan36), y - distance);
				[x, y] = oneLine(ctx, x, y, x - distance * tan30, y - distance * tan30);
				text(ctx, x, y, "HS");
			} else {
				[x, y] = oneLine(ctx, x, y, x + distance * (1 - tan36), y + distance);
				[x, y] = oneLine(ctx, x, y, x - distance * tan30, y + distance * tan30);
				text(ctx, x, y + fontHeight(ctx), "HS");
			}
		}
	}],
	["D", {
		letter: "D",
		name: "Aspartic Acid",
		draw: (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
			if (inverted) {
				[x, y] = oneLine(ctx, x, y, x, y - distance);
				[x, y] = oneLine(ctx, x, y, x + distance, y - distance * tan36);
				const [oxygenX, oxygenY] = doubleLine(ctx, x, y, x + distance, y);
				text(ctx, oxygenX + fontHeight(ctx), oxygenY + fontHeight(ctx) / 2, "O");
				[x, y] = oneLine(ctx, x, y, x - distance * tan30, y - distance);
				drawOMinus(ctx, x - fontHeight(ctx), y - fontHeight(ctx));
			} else {
				[x, y] = oneLine(ctx, x, y, x, y + distance);
				[x, y] = oneLine(ctx, x, y, x + distance, y + distance * tan36);
				const [oxygenX, oxygenY] = doubleLine(ctx, x, y, x + distance, y);
				text(ctx, oxygenX + fontHeight(ctx), oxygenY + fontHeight(ctx) / 2, "O");
				[x, y] = oneLine(ctx, x, y, x - distance * tan30, y + distance);
				drawOMinus(ctx, x - fontHeight(ctx), y + fontHeight(ctx));
			}
		}
	}],
	["E", { letter: "E", name: "Glutamic Acid" }],
	["F", { letter: "F", name: "Phenylalanine" }],
	["G", {
		letter: "G",
		name: "Glycine",
		draw: (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
				// empty in this case
		}
	}],
	["H", { letter: "H", name: "Histidine" }],
	["I", {
		letter: "I",
		name: "Isoleucine",
		draw: (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
			if (inverted) {
				[x, y] = oneLine(ctx, x, y, x, y - distance);
				oneLine(ctx, x, y, x + distance, y - distance * tan30);
				[x, y] = oneLine(ctx, x, y, x - distance , y - distance * tan30);
				[x, y] = oneLine(ctx, x, y, x, y - distance);
			} else {
				[x, y] = oneLine(ctx, x, y, x, y + distance);
				oneLine(ctx, x, y, x + distance, y + distance * tan30);
				[x, y] = oneLine(ctx, x, y, x - distance , y + distance * tan30);
				[x, y] = oneLine(ctx, x, y, x, y + distance);
			}
		}
	}],
	["K", { letter: "K", name: "Lysine" }],
	["L", { //TODO: shape for discussion
		letter: "L",
		name: "Leucine",
		draw: (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
			if (inverted) {
				[x, y] = oneLine(ctx, x, y, x, y - distance);
				[x, y] = oneLine(ctx, x, y, x + distance, y - distance);
				oneLine(ctx, x, y, x + distance, y + distance * tan30);
				oneLine(ctx, x, y, x + distance , y - distance * tan30);
			} else {
				[x, y] = oneLine(ctx, x, y, x, y + distance);
				[x, y] = oneLine(ctx, x, y, x + distance, y + distance * tan30);
				oneLine(ctx, x, y, x + distance, y + distance * tan30);
				oneLine(ctx, x, y, x + distance , y - distance * tan30);
			}
		}
	}],
	["M", { letter: "M", name: "Methionine" }],
	["N", { letter: "N", name: "Asparagine" }],
	["P", { letter: "P", name: "Proline" }],
	["Q", { letter: "Q", name: "Glutamine" }],
	["R", { letter: "R", name: "Arginine" }],
	["S", {
		letter: "S",
		name: "Serine",
		draw: (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
			if (inverted) {
				[x, y] = oneLine(ctx, x, y, x + distance * (1 - tan36), y - distance);
				[x, y] = oneLine(ctx, x, y, x - distance * tan30, y - distance * tan30);
				text(ctx, x, y, "OH");
			} else {
				[x, y] = oneLine(ctx, x, y, x + distance * (1 - tan36), y + distance);
				[x, y] = oneLine(ctx, x, y, x - distance * tan30, y + distance * tan30);
				text(ctx, x, y + fontHeight(ctx), "OH");
			}
		}
	}],
	["T", { letter: "T", name: "Threonine" }],
	["U", { // Not on pepdraw
		letter: "U",
		name: "Selenocysteine",
		draw: (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
			if (inverted) {
				[x, y] = oneLine(ctx, x, y, x + distance * (1 - tan36), y - distance);
				[x, y] = oneLine(ctx, x, y, x - distance * tan30, y - distance * tan30);
				text(ctx, x, y, "Se");
			} else {
				[x, y] = oneLine(ctx, x, y, x + distance * (1 - tan36), y + distance);
				[x, y] = oneLine(ctx, x, y, x - distance * tan30, y + distance * tan30);
				text(ctx, x, y + fontHeight(ctx), "Se");
			}
		}
	}],
	["V", {
		letter: "V",
		name: "Valine",
		draw: (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
			if (inverted) {
				[x, y] = oneLine(ctx, x, y, x, y - distance);
				oneLine(ctx, x, y, x + distance, y - distance * tan30);
				oneLine(ctx, x, y, x - distance , y - distance * tan30);
			} else {
				[x, y] = oneLine(ctx, x, y, x, y + distance);
				oneLine(ctx, x, y, x + distance, y + distance * tan30);
				oneLine(ctx, x, y, x - distance , y + distance * tan30);
			}
		}
	}],
	["W", { letter: "W", name: "Tryptophan" }],
	["Y", { letter: "Y", name: "Tyrosine" }],
	["STOP", { letter: "STOP", name: "STOP" }]
]);
