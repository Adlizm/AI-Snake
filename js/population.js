class Population{
    constructor(length,mutationRate,reprodutionRate){
        this.length = length;
        this.mutationRate = mutationRate;
        this.reprodutionRate = reprodutionRate;
        this.snakes = [];
        this.allDeath = false;
        this.geracion = 0;
        this.best;
        this.newPoputation();
    }
    newPoputation(){
        if(this.geracion == 0){
            for(let i = 0; i < this.length; i++){
                this.snakes[i] = new Snake(15,15);
            }
        }else{
            var sum = this.allFitness();
            this.getBestSnake();
            
            var newSnakes = [];
            for(let i = 1; i < this.length; i++){
                if(Math.random() < this.reprodutionRate){
                    let num = Math.floor(Math.random()*sum);
                    let mother = this.getSnake(num);
                    let child = this.getChild(mother,this.best);
                    child.mutate();
                    newSnakes.push(child);
                }
            }
            this.snakes = newSnakes;
            this.length = this.snakes.length;
        }
    }
    getChild(mother,father){
        return NeuralNet.crossover(mother.neural,father.neural);
    }
    allFitness(){
        var sum = 0;
        for(let snake of this.snakes){
            sum += snake.calcFitness();
        }
        return sum;
    }
    getSnake(number){
        for(let snake of this.snakes){
            number -= snake.fitness;
            if(number <= 0){
                return snake;
            }
        }
    }
    getBestSnake(){
        if(!this.best){
            this.best = this.snakes[0];
        }
        for(let i = 0; i < this.length; i++){
            if(this.snakes[i].fitness > this.best.fitness){
                this.best = this.snakes[i];
            }
        }
    }
    updateAndDraw(){
        if(this.allDeath){
            this.geracion++;
            this.drawCreateGeracion();
            this.newPoputation();
            this.allDeath = false;

        }else{
            let snakeForDraw;
            this.allDeath = true;
            for(let snake of this.snakes){
                if(!snake.isDeath){
                    this.allDeath = false;
                    snake.update();
                    if(!snakeForDraw){
                        snakeForDraw = snake;
                    }else if(snake.length > snakeForDraw.length){
                        snakeForDraw = snake;
                    }
                }
            }
            snakeForDraw && this.draw(snakeForDraw);
        }
    }
    draw(snake){
        ctx.font = "14px Arial";
        ctx.textAlign = "left";
        ctx.fillStyle = "#fff";
        ctx.fillText(
            "  Geracion: "+this.geracion+
            "  Length:  "+this.length+
            "  Score: "+(snake.length-4),
        0,16);
        snake.draw();
    }
    drawCreateGeracion(){
        ctx.font = "32px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText("Creating Next Generation! ",canvas.width/2,canvas.height/2);
    }
}