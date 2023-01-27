import React, { useEffect, useRef } from "react";
import { drawBase, drawNH, drawNH3, drawOMinus, text } from "../../utils/canvas";
import { AminoAcids } from "../../utils/aminoAcids";

function Canvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		const canvas = canvasRef.current!;
		manageCanvas(canvas, 1900, 700, "ACDGILSUV");
	}, []);

	return (
		<div>
			<h1>Canvas</h1>
			<canvas
				ref={canvasRef}
				style={{
					border: "1px solid black",
					cursor: "grab",
				}}
				id="canvas"
				width="1900"
				height="700"
			></canvas>
		</div>
	);
}

const manageCanvas = (canvas: HTMLCanvasElement, width: number, height: number, peptide: string) => {
	const ctx = canvas.getContext("2d")!;
	const cameraOffset = { x: 0, y: 0 };
	let cameraZoom = 1;
	const SCROLL_SENSITIVITY = 0.0005;
	const minZoom = 0.1;
	const maxZoom = 5;

	function draw() {
		canvas.width = width;
		canvas.height = height;

		ctx.translate(width/2, height/2);
		ctx.scale(cameraZoom, cameraZoom);
		ctx.translate(-width/2 + cameraOffset.x, -height/2 + cameraOffset.y);

		resetCanvas(ctx);
		drawPeptide(ctx, peptide);

		requestAnimationFrame(draw);
	}

	let panning = false;
	let panStart = { x: 0, y: 0 };

	function mouseDown(e: MouseEvent) {
		panning = true;
		panStart.x = e.clientX/cameraZoom - cameraOffset.x;
		panStart.y = e.clientY/cameraZoom - cameraOffset.y;
	}
	function mouseUp(e: MouseEvent) {
		panning = false;
	}
	function mouseMove(e: MouseEvent) {
		if(panning) {
			cameraOffset.x = e.clientX/cameraZoom - panStart.x;
			cameraOffset.y = e.clientY/cameraZoom - panStart.y;
		}
	}

	function adjustZoom(delta: number) {
		// don't zoom if panning, causes weird behaviour
		if(panning) return;

		cameraZoom += delta;
		if(cameraZoom < minZoom) cameraZoom = minZoom;
		if(cameraZoom > maxZoom) cameraZoom = maxZoom;
	}

	canvas.addEventListener("mousedown", mouseDown)
	canvas.addEventListener("mouseup", mouseUp)
	canvas.addEventListener("mousemove", mouseMove)
	canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))

	draw();
}

const resetCanvas = (ctx: CanvasRenderingContext2D) => {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.save();
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const drawPeptide = (ctx: CanvasRenderingContext2D, acidString: string) => {
	let x = 100, y = 320;
	drawNH3(ctx, x, y);
	let inverted = false;
	y += !inverted ? 10 : -30; // Create a margin-bottom for NH3 if !inverted, margin-top if inverted
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