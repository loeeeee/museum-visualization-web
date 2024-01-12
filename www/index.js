// If you only use `npm` you can simply
// import { Chart } from "wasm-demo" and remove `setup` call from `bootstrap.js`.
class Chart {}

const canvas = document.getElementById("canvas");
const coord = document.getElementById("coord");
const status = document.getElementById("status");

let chart = null;
let chart_coord = {x:0,y:0}

/** Main entry point */
export function main() {
    setupUI();
    setupCanvas();
}

/** This function is used in `bootstrap.js` to setup imports. */
export function setup(WasmChart) {
    Chart = WasmChart;
    console.log("setup")
}

/** Add event listeners. */
function setupUI() {
    window.addEventListener("resize", setupCanvas);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
}

/** Setup canvas to properly handle high DPI and redraw current plot. */
function setupCanvas() {
    const aspectRatio = canvas.width / canvas.height;
    const size = canvas.parentNode.offsetWidth * 0.8;
    canvas.style.width = size + "px";
    canvas.style.height = size / aspectRatio + "px";
    canvas.width = size;
    canvas.height = size / aspectRatio;
    updatePlot();
}

/** Update displayed coordinates. */
function onMouseMove(event) {
    if (chart) {
		var text = "Mouse pointer is out of range";

		if(event.target == canvas) {
			let actualRect = canvas.getBoundingClientRect();
			let logicX = event.offsetX * canvas.width / actualRect.width;
			let logicY = event.offsetY * canvas.height / actualRect.height;
			const point = chart.coord(logicX, logicY);
			text = (point) 
				? `(${point.x.toFixed(3)}, ${point.y.toFixed(3)})`
				: text;
		}
        coord.innerText = text;
    }
	else{
		console.log('nochart')
	}
}

/** Handle mouse down event */
function onMouseDown(event) {
    let actualRect = canvas.getBoundingClientRect();
    let logicX = event.offsetX * canvas.width / actualRect.width;
    let logicY = event.offsetY * canvas.height / actualRect.height;
    let ccoord = chart.coord(logicX, logicY)
    chart_coord.x = ccoord.x;
    chart_coord.y = ccoord.y;
    updatePlot()
}

/** Handle mouse up event */
function onMouseUp(event) {
}


function updatePlot() {
    status.innerText = `Rendering ...`;
    const start = performance.now();
	chart = Chart.draw_rectangle(canvas,chart_coord.x,chart_coord.y);
    const end = performance.now();
    status.innerText = `Rendered in ${Math.ceil(end - start)}ms`;
}