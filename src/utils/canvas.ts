export const tan30 = 0.57735; /// for use with hexagons
export const tan36 = 0.80902; /// for use with pentagons

const scalingFactor = 2;
const baseSize = 30 * scalingFactor;
export const distance = baseSize;
const lineWidth = baseSize / 15;
const fontSize = baseSize / 2;
const font = fontSize + "px Arial";

const strokeStyle = "black";
const fillStyle = "black";

export const drawBase = (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
	ctx.save();
	let peptideX = x;
	let peptideY = y;
	if (!inverted) {
		// text(ctx, x, y, "H₃N⁺"); // this should be used only in the very first base
		[x, y] = oneLine(ctx, x, y, x + distance, y + distance * tan30);
		peptideX = x;
		peptideY = y;
		[x, y] = oneLine(ctx, x, y, x + distance, y - distance * tan30);
		const [oxygenX, oxygenY] = doubleLine(ctx, x, y, x, y - distance);
		text(ctx, oxygenX, oxygenY, "O");
		[x, y] = oneLine(ctx, x, y, x + distance, y + distance * tan30);
	} else {
		// TODO: draw inverted base
		[x, y] = oneLine(ctx, x, y, x + distance, y - distance * tan30);
		peptideX = x;
		peptideY = y;
		[x, y] = oneLine(ctx, x, y, x + distance, y + distance * tan30);
		const [oxygenX, oxygenY] = doubleLine(ctx, x, y, x, y + distance);
		text(ctx, oxygenX, oxygenY + fontHeight(ctx), "O");
		[x, y] = oneLine(ctx, x, y, x + distance, y - distance * tan30);
	}
	ctx.restore();
	return [x, y, peptideX, peptideY];
};

export const drawNH3 = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
	ctx.save();
	text(ctx, x, y, "H₃N⁺");
	ctx.restore();
	return [x, y];
};
export const drawOMinus = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
	ctx.save();
	x += ctx.measureText("O⁻").width;
	y += fontHeight(ctx) / 2;
	text(ctx, x, y, "O⁻");
	ctx.restore();
	return [x, y];
};
export const drawNH = (ctx: CanvasRenderingContext2D, x: number, y: number, up: boolean) => {
	ctx.save();
	if (up) y -= fontHeight(ctx) / 5;
	else y += fontHeight(ctx);
	text(ctx, x, y, "N");
	if (up) y -= fontHeight(ctx);
	else y += fontHeight(ctx);
	text(ctx, x, y, "H");
	ctx.restore();
	return [x, y];
};


export const oneLine = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number): [number, number] => {
	ctx.beginPath();
	ctx.strokeStyle = strokeStyle;
	ctx.lineWidth = lineWidth;
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
	ctx.closePath();
	return [endX, endY];
};

export const doubleLine = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number): [number, number] => {
	// calculating the vector and the perpendicular vector
	const [vectorX, vectorY] = [endX - startX, endY - startY];
	// multiplying the perpendicular vector by 0.07 to make it smaller


	// WARNING: this is a magic number, and should be changed if the distance is changed #IMPORTANT
	const [perpendicularVectorX, perpendicularVectorY] = [-vectorY * 0.07, vectorX * 0.07];


	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth = lineWidth;
	ctx.moveTo(startX, startY);
	ctx.moveTo(startX + perpendicularVectorX, startY + perpendicularVectorY);
	ctx.lineTo(endX + perpendicularVectorX, endY + perpendicularVectorY);
	ctx.moveTo(startX - perpendicularVectorX, startY - perpendicularVectorY);
	ctx.lineTo(endX - perpendicularVectorX, endY - perpendicularVectorY);
	ctx.stroke();
	ctx.closePath();
	return [endX, endY];
};

export const text = (ctx: CanvasRenderingContext2D, x: number, y: number, text: string) => {
	ctx.beginPath();

	ctx.fillStyle = fillStyle;
	ctx.font = font;

	const width = ctx.measureText(text).width;

	ctx.fillText(text, x - width / 2, y);

	ctx.closePath();
};

export const fontHeight = (ctx: CanvasRenderingContext2D) => {
	ctx.save();
	ctx.font = font;
	ctx.fillStyle = fillStyle;

	const lineHeight = ctx.measureText("M").width;

	ctx.restore();

	return lineHeight;
};
