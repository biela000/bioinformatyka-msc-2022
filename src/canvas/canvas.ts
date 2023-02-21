import { AminoAcids } from "../utils/aminoAcids";

export const tan30 = 0.57735; /// for use with hexagons
export const tan36 = 0.80902; /// for use with pentagons

const scalingFactor = 2;
const baseSize = 30 * scalingFactor;
const baseDistance = baseSize * 3;

export const distance = baseSize;
const lineWidth = baseSize / 15;
const fontSize = baseSize / 2;
const font = fontSize + 'px Arial';
const strokeStyle = 'black';
const fillStyle = 'black';

const hoverStrokeStyle = 'rgba(255, 0, 0, 0.5)';
const hoverFillStyle = 'rgba(255, 0, 0, 0.5)';
const hoverLineWidth = lineWidth * 3;
const hoverFont = fontSize + 'px Arial';

let strokedText = false;

type MousePosition = {
	x: number;
	y: number;
}

export const drawPeptide = (ctx: CanvasRenderingContext2D, acidString: string, mousePosition: MousePosition, cameraXMinMax: {min: number, max: number}) => {
	// starting point
	let x = 100,
		y = 320;

	ctx.fillStyle = fillStyle;
	ctx.strokeStyle = strokeStyle;
	ctx.lineWidth = lineWidth;
	ctx.font = font;

	const baseWidth = distance * 3;

	// calculate the hover index based on mouse x and baseWidth (distance * 3)
	const hoverIndex = Math.floor((mousePosition.x - x) / baseWidth);

	let inverted = false;
	for (let i = 0; i < acidString.length; i++) {
		if(x < cameraXMinMax.min - baseDistance || x > cameraXMinMax.max) {
			[x, y] = getNewBasePos(ctx, x, y, inverted);
			inverted = !inverted;
			continue;
		}
		if (i === 0) {
			drawNH3(ctx, x, y);
		} else {
			drawNH(ctx, x, y, !inverted);
		}
		let [newX, newY, peptideX, peptideY] = drawBase(ctx, x, y, inverted);

		const aminoAcid = AminoAcids.get(acidString[i]);
		if (aminoAcid && aminoAcid.draw) {
			aminoAcid.draw(ctx, peptideX, peptideY, inverted);
		}

		ctx.save();
		if (i === hoverIndex) {
			ctx.save();
			ctx.fillStyle = hoverFillStyle;
			ctx.strokeStyle = hoverStrokeStyle;
			ctx.lineWidth = hoverLineWidth;
			ctx.font = hoverFont;
			strokedText = true;

			// @ts-ignore // using for now, when the hoverIndex is a constant
			if (i === 0) {
				drawNH3(ctx, x, y);
			} else {
				drawNH(ctx, x, y, !inverted);
			}
			[x, y, peptideX, peptideY] = drawBase(ctx, x, y, inverted);

			const aminoAcid = AminoAcids.get(acidString[i]);
			if (aminoAcid && aminoAcid.draw) {
				aminoAcid.draw(ctx, peptideX, peptideY, inverted);
			}
		} else {
			x = newX;
			y = newY;
		}

		if (i === acidString.length - 1) {
			drawOMinus(ctx, x, y);
		}
		ctx.restore();
		strokedText = false;
		inverted = !inverted;
	}
};


export const drawBase = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	inverted: boolean = false,
) => {
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
		text(ctx, oxygenX, oxygenY, 'O');
		[x, y] = oneLine(ctx, x, y, x + distance, y + distance * tan30);
	} else {
		// TODO: draw inverted base
		[x, y] = oneLine(ctx, x, y, x + distance, y - distance * tan30);
		peptideX = x;
		peptideY = y;
		[x, y] = oneLine(ctx, x, y, x + distance, y + distance * tan30);
		const [oxygenX, oxygenY] = doubleLine(ctx, x, y, x, y + distance);
		text(ctx, oxygenX, oxygenY + fontHeight(ctx), 'O');
		[x, y] = oneLine(ctx, x, y, x + distance, y - distance * tan30);
	}
	ctx.restore();
	return [x, y, peptideX, peptideY];
};

// similar to the drawBase function, but only returns new positions, without actually drawing anything
export const getNewBasePos = (ctx: CanvasRenderingContext2D, x: number, y: number, inverted: boolean = false) => {
	x = x + baseDistance;
	if(!inverted) {
		y = y + distance * tan30;
	} else {
		y = y - distance * tan30;
	}
	return [x, y];
};

export const drawNH3 = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number
) => {
	ctx.save();
	text(ctx, x, y, 'H₃N⁺');
	ctx.restore();
	return [x, y];
};
export const drawOMinus = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
) => {
	ctx.save();
	x += ctx.measureText('O⁻').width;
	y += fontHeight(ctx) / 2;
	text(ctx, x, y, 'O⁻');
	ctx.restore();
	return [x, y];
};
export const drawNH = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	up: boolean,
) => {
	ctx.save();
	if (up) y -= fontHeight(ctx) / 5;
	else y += fontHeight(ctx);
	text(ctx, x, y, 'N');
	if (up) y -= fontHeight(ctx);
	else y += fontHeight(ctx);
	text(ctx, x, y, 'H');
	ctx.restore();
	return [x, y];
};

export const oneLine = (
	ctx: CanvasRenderingContext2D,
	startX: number,
	startY: number,
	endX: number,
	endY: number,
): [number, number] => {
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
	ctx.closePath();
	return [endX, endY];
};

export const dottedLine = (
	ctx: CanvasRenderingContext2D,
	startX: number,
	startY: number,
	endX: number,
	endY: number,
): [number, number] => {
	ctx.save();
	ctx.setLineDash([3, 3]);
	const [x, y] = oneLine(ctx, startX, startY, endX, endY);
	ctx.restore();
	return [x, y];
}

export const lineAtAngle = (
	ctx: CanvasRenderingContext2D,
	startX: number,
	startY: number,
	length: number,
	angle: number,
): [number, number] => {
	const properAngle = angle * (Math.PI / 180);
	const endX = startX + length * Math.cos(properAngle);
	const endY = startY + length * Math.sin(properAngle);
	return dottedDoubleLine(ctx, startX, startY, endX, endY);
}

export const doubleLine = (
	ctx: CanvasRenderingContext2D,
	startX: number,
	startY: number,
	endX: number,
	endY: number,
): [number, number] => {
	// calculating the vector and the perpendicular vector
	const [vectorX, vectorY] = [endX - startX, endY - startY];
	// multiplying the perpendicular vector by 0.07 to make it smaller

	// WARNING: this is a magic number, and should be changed if the distance is changed
	const [perpendicularVectorX, perpendicularVectorY] = [
		-vectorY * 0.07,
		vectorX * 0.07,
	];

	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.moveTo(startX + perpendicularVectorX, startY + perpendicularVectorY);
	ctx.lineTo(endX + perpendicularVectorX, endY + perpendicularVectorY);
	ctx.moveTo(startX - perpendicularVectorX, startY - perpendicularVectorY);
	ctx.lineTo(endX - perpendicularVectorX, endY - perpendicularVectorY);
	ctx.stroke();
	ctx.closePath();
	return [endX, endY];
};

// copying the above function - only dotted line is the left one
export const dottedDoubleLine = (
	ctx: CanvasRenderingContext2D,
	startX: number,
	startY: number,
	endX: number,
	endY: number,
): [number, number] => {
	// calculating the vector and the perpendicular vector
	const [vectorX, vectorY] = [endX - startX, endY - startY];
	// multiplying the perpendicular vector by 0.07 to make it smaller

	// WARNING: this is a magic number, and should be changed if the distance is changed
	const [perpendicularVectorX, perpendicularVectorY] = [
		-vectorY * 0.07,
		vectorX * 0.07,
	];

	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.moveTo(startX + perpendicularVectorX, startY + perpendicularVectorY);
	ctx.lineTo(endX + perpendicularVectorX, endY + perpendicularVectorY);
	ctx.stroke();
	ctx.setLineDash([3, 3])
	ctx.moveTo(startX - perpendicularVectorX, startY - perpendicularVectorY);
	ctx.lineTo(endX - perpendicularVectorX, endY - perpendicularVectorY);
	ctx.stroke();
	ctx.setLineDash([0, 0])
	ctx.closePath();
	return [endX, endY];
}

export const drawHexagon = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	inverted: boolean = false,
	dotted: boolean = true,
) => {
	ctx.save();
	const [startX, startY] = [x, y];
	const angles = [180, 120, 60, 0, -60, -120];
	const invertedAngles = [-60, -120, 180, 120, 60, 0];

	for(let i = 0; i < 6; i++) {
		if(inverted) {
			[x, y] = lineAtAngle(ctx, x, y, distance, invertedAngles[i]);
		}
		else {
			[x, y] = lineAtAngle(ctx, x, y, distance, angles[i]);
		}
	}

	ctx.restore();
}

export const smallWhiteCircle = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
) => {
	ctx.save();
	ctx.beginPath();
	ctx.arc(x, y, 15, 0, 2 * Math.PI);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

export const text = (ctx: CanvasRenderingContext2D, x: number, y: number, text: string) => {
	ctx.beginPath();
	const width = ctx.measureText(text).width;
	ctx.fillText(text, x - width / 2, y);
	if(strokedText) {
		ctx.save();
		ctx.strokeStyle = hoverStrokeStyle;
		ctx.lineWidth = lineWidth;
		ctx.strokeText(text, x - width / 2, y);
		ctx.restore();
	}
	ctx.closePath();
};

export const fontHeight = (ctx: CanvasRenderingContext2D) => {
	ctx.save();
	const lineHeight = ctx.measureText('M').width;
	ctx.restore();

	return lineHeight;
};