import { Point } from "../types";

export function clearCanvas(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return;
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

export function setCanvasSize(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) {
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.getContext("2d")?.scale(2, 2);
}

export function drawStroke(
  context: CanvasRenderingContext2D,
  points: Point[],
  color: string
) {
  if (!points.length) return;
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  points.forEach((point) => {
    context.lineTo(point.x, point.y);
    context.stroke();
  });
  context.closePath();
}
