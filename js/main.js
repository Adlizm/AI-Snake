const Width = 30, Height = 30, whBlock = 15;
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const shape = [8,16,4]; // shape of neural network 8 inputs, 16 hidden ,4 output
var Loop = true;

canvas.width = Width*whBlock;
canvas.height = Height*whBlock;
document.body.appendChild(canvas);

const btnStart = document.getElementById("btnStart");
const Start = () => {
    var size = document.getElementById("size");
    var mutR = document.getElementById("mutR");
    var repR = document.getElementById("repR");

    pop = new Population(size.value,mutR.value/100,repR.value/100);
    Loop = true;
};
btnStart.onclick = Start;
const run = () => {
    if(Loop){
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        pop.updateAndDraw();
    }
    window.requestAnimationFrame(run);
}
var pop = new Population(200,0.05,0.95);

run();