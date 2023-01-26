import React, { useEffect, useRef } from "react";
import { drawBase, drawNH, drawNH3, drawOMinus, text } from "../../utils/canvas";
import { AminoAcids } from "../../utils/aminoAcids";

function Canvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		const canvas = canvasRef.current!;
		const context = canvas.getContext("2d")!;
		resetCanvas(context);

		const acidString = "AACCGG";
		drawPeptide(context, acidString);

		// drawNH3(context, 100, 100);
		// let [x, y] = drawBase(context, 100, 100, false);
		// drawNH(context, x, y, false);
		// [x, y] = drawBase(context, x, y, true);
		// drawNH(context, x, y, true);
		// [x, y] = drawBase(context, x, y, false);
		// drawOMinus(context, x, y);

	}, []);

	return (
		<div>
			<h1>Canvas</h1>
			<canvas
				ref={canvasRef}
				style={{
					border: "1px solid white"
				}}
				id="canvas"
				width="1900"
				height="500"
			></canvas>
		</div>
	);
}

const resetCanvas = (ctx: CanvasRenderingContext2D) => {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.save();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const drawPeptide = (ctx: CanvasRenderingContext2D, acidString: string) => {
	let x = 100, y = 230;
	drawNH3(ctx, x, y);
	let inverted = false;
	for (let i = 0; i < acidString.length; i++) {
		let peptideX = 0, peptideY = 0;
		[x, y, peptideX, peptideY] = drawBase(ctx, x, y, inverted);

		const aminoAcid = AminoAcids.get(acidString[i]);
		if (aminoAcid && aminoAcid.draw) {
			aminoAcid.draw(ctx, peptideX, peptideY, inverted);
		}

		if (i !== acidString.length - 1) {
			drawNH(ctx, x, y, inverted);
		} else {
			drawOMinus(ctx, x, y);
		}
		inverted = !inverted;
	}
};

export default Canvas;