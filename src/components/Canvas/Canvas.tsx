import React, { useEffect, useRef } from 'react';
import { drawPeptide } from "../../canvas/canvas";

interface CanvasProps {
	peptide?: string;
}

function Canvas({ peptide }: CanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		const canvas = canvasRef.current!;
		manageCanvas(canvas, 1900, 700, peptide ?? 'ACDGILSUV');
	}, [peptide]);

	return (
		<div>
			<h1>Canvas</h1>
			<canvas
				ref={canvasRef}
				style={{
					border: '1px solid black',
					cursor: 'grab',
				}}
				id="canvas"
				width="1900"
				height="700"
			></canvas>
		</div>
	);
}

const manageCanvas = (
	canvas: HTMLCanvasElement,
	width: number,
	height: number,
	peptide: string,
) => {
	const ctx = canvas.getContext('2d')!;
	const cameraOffset = { x: 0, y: 0 };
	let cameraZoom = 1;
	const SCROLL_SENSITIVITY = 0.0005;
	const minZoom = 0.1;
	const maxZoom = 5;

	const mouse = {x: 0, y: 0};

	function draw() {
		canvas.width = width;
		canvas.height = height;

		ctx.translate(width / 2, height / 2);
		ctx.scale(cameraZoom, cameraZoom);
		ctx.translate(
			-width / 2 + cameraOffset.x,
			-height / 2 + cameraOffset.y,
		);

		resetCanvas(ctx);
		drawPeptide(ctx, peptide);
		// drawHoverPeptide(ctx, peptide, mouse.x, mouse.y);

		// draw a red circle at the mouse position
		ctx.beginPath();
		ctx.arc(mouse.x, mouse.y, 20, 0, 2 * Math.PI);
		ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
		ctx.fill();


		requestAnimationFrame(draw);
	}

	let panning = false;
	let panStart = { x: 0, y: 0 };

	function mouseDown(e: MouseEvent) {
		panning = true;
		panStart.x = e.clientX / cameraZoom - cameraOffset.x;
		panStart.y = e.clientY / cameraZoom - cameraOffset.y;
	}
	function mouseUp(e: MouseEvent) {
		panning = false;
	}
	function mouseMove(e: MouseEvent) {
		if (panning) {
			cameraOffset.x = e.clientX / cameraZoom - panStart.x;
			cameraOffset.y = e.clientY / cameraZoom - panStart.y;
		}

		getMousePosition(e);
	}

	function adjustZoom(delta: number) {
		// don't zoom if panning, causes weird behaviour
		if (panning) return;

		cameraZoom += delta;
		if (cameraZoom < minZoom) cameraZoom = minZoom;
		if (cameraZoom > maxZoom) cameraZoom = maxZoom;
	}

	function getMousePosition(e: MouseEvent) {
		/// DON'T EVER EVEN DREAM OF TOUCHING THIS CODE
		/// SWEAT AND BLOOD WENT INTO THIS AND I WILL NOT LET YOU RUIN IT
		mouse.x = (e.clientX - canvas.offsetLeft - width / 2) / cameraZoom + width / 2 - cameraOffset.x;
		mouse.y = (e.clientY - canvas.offsetTop - height / 2) / cameraZoom + height / 2 - cameraOffset.y;
	}

	canvas.addEventListener('mousedown', mouseDown);
	canvas.addEventListener('mouseup', mouseUp);
	canvas.addEventListener('mousemove', mouseMove);
	canvas.addEventListener('wheel', e =>
		adjustZoom(e.deltaY * SCROLL_SENSITIVITY),
	);

	draw();
};

const resetCanvas = (ctx: CanvasRenderingContext2D) => {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.save();
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};


export default Canvas;
