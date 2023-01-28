import {
	distance,
	doubleLine,
	drawOMinus,
	fontHeight,
	oneLine,
	tan30,
	tan36,
	text,
} from './canvas';

export const drawAminoAcid = {
	drawAla: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		inverted: boolean = false,
	) => {
		if (inverted) {
			oneLine(ctx, x, y, x, y - distance);
		} else {
			oneLine(ctx, x, y, x, y + distance);
		}
	},
	drawCys: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		inverted: boolean = false,
	) => {
		if (inverted) {
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x + distance * (1 - tan36),
				y - distance,
			);
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x - distance * tan30,
				y - distance * tan30,
			);
			text(ctx, x, y, 'HS');
		} else {
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x + distance * (1 - tan36),
				y + distance,
			);
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x - distance * tan30,
				y + distance * tan30,
			);
			text(ctx, x, y + fontHeight(ctx), 'HS');
		}
	},
	drawAsp: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		inverted: boolean = false,
	) => {
		if (inverted) {
			[x, y] = oneLine(ctx, x, y, x, y - distance);
			[x, y] = oneLine(ctx, x, y, x + distance, y - distance * tan36);
			const [oxygenX, oxygenY] = doubleLine(ctx, x, y, x + distance, y);
			text(
				ctx,
				oxygenX + fontHeight(ctx),
				oxygenY + fontHeight(ctx) / 2,
				'O',
			);
			[x, y] = oneLine(ctx, x, y, x - distance * tan30, y - distance);
			drawOMinus(ctx, x - fontHeight(ctx), y - fontHeight(ctx));
		} else {
			[x, y] = oneLine(ctx, x, y, x, y + distance);
			[x, y] = oneLine(ctx, x, y, x + distance, y + distance * tan36);
			const [oxygenX, oxygenY] = doubleLine(ctx, x, y, x + distance, y);
			text(
				ctx,
				oxygenX + fontHeight(ctx),
				oxygenY + fontHeight(ctx) / 2,
				'O',
			);
			[x, y] = oneLine(ctx, x, y, x - distance * tan30, y + distance);
			drawOMinus(ctx, x - fontHeight(ctx), y + fontHeight(ctx));
		}
	},
	drawGlu: undefined,
	drawPhe: undefined,
	drawGly: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		inverted: boolean = false,
	) => {
		// empty in this case
	},
	drawHis: undefined,
	drawIle: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		inverted: boolean = false,
	) => {
		if (inverted) {
			[x, y] = oneLine(ctx, x, y, x, y - distance);
			oneLine(ctx, x, y, x + distance, y - distance * tan30);
			[x, y] = oneLine(ctx, x, y, x - distance, y - distance * tan30);
			[x, y] = oneLine(ctx, x, y, x, y - distance);
		} else {
			[x, y] = oneLine(ctx, x, y, x, y + distance);
			oneLine(ctx, x, y, x + distance, y + distance * tan30);
			[x, y] = oneLine(ctx, x, y, x - distance, y + distance * tan30);
			[x, y] = oneLine(ctx, x, y, x, y + distance);
		}
	},
	drawLys: undefined,
	drawLeu: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		inverted: boolean = false,
	) => {
		if (inverted) {
			[x, y] = oneLine(ctx, x, y, x, y - distance);
			[x, y] = oneLine(ctx, x, y, x + distance, y - distance);
			oneLine(ctx, x, y, x + distance, y + distance * tan30);
			oneLine(ctx, x, y, x + distance, y - distance * tan30);
		} else {
			[x, y] = oneLine(ctx, x, y, x, y + distance);
			[x, y] = oneLine(ctx, x, y, x + distance, y + distance * tan30);
			oneLine(ctx, x, y, x + distance, y + distance * tan30);
			oneLine(ctx, x, y, x + distance, y - distance * tan30);
		}
	},
	drawMet: undefined,
	drawAsn: undefined,
	drawPro: undefined,
	drawGln: undefined,
	drawArg: undefined,
	drawSer: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		inverted: boolean = false,
	) => {
		if (inverted) {
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x + distance * (1 - tan36),
				y - distance,
			);
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x - distance * tan30,
				y - distance * tan30,
			);
			text(ctx, x, y, 'OH');
		} else {
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x + distance * (1 - tan36),
				y + distance,
			);
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x - distance * tan30,
				y + distance * tan30,
			);
			text(ctx, x, y + fontHeight(ctx), 'OH');
		}
	},
	drawThr: undefined,
	drawSec: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		inverted: boolean = false,
	) => {
		if (inverted) {
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x + distance * (1 - tan36),
				y - distance,
			);
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x - distance * tan30,
				y - distance * tan30,
			);
			text(ctx, x, y, 'Se');
		} else {
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x + distance * (1 - tan36),
				y + distance,
			);
			[x, y] = oneLine(
				ctx,
				x,
				y,
				x - distance * tan30,
				y + distance * tan30,
			);
			text(ctx, x, y + fontHeight(ctx), 'Se');
		}
	},
	drawVal: (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		inverted: boolean = false,
	) => {
		if (inverted) {
			[x, y] = oneLine(ctx, x, y, x, y - distance);
			oneLine(ctx, x, y, x + distance, y - distance * tan30);
			oneLine(ctx, x, y, x - distance, y - distance * tan30);
		} else {
			[x, y] = oneLine(ctx, x, y, x, y + distance);
			oneLine(ctx, x, y, x + distance, y + distance * tan30);
			oneLine(ctx, x, y, x - distance, y + distance * tan30);
		}
	},
	drawTrp: undefined,
	drawTyr: undefined,
};
