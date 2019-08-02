const Width = 30, Height = 30, whBlock = 15;
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const shape = [8,16,4];

canvas.width = Width*whBlock;
canvas.height = Height*whBlock;
document.body.appendChild(canvas);

function keyPress(e){
    console.log(e);
}

document.body.addEventListener("keydown",keyPress);
const run = () => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    pop.updateAndDraw();
    window.requestAnimationFrame(run);
}
var pop = new Population(200,0.05,0.95);

run();