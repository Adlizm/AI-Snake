class Snake{
    constructor(x,y, neural){
        this.pos = {x,y};
        this.food = {
            x: Math.floor(Math.random()*Width),
            y: Math.floor(Math.random()*Height)
        }
        this.direct = {x: 1, y: 0};
        this.length = 4;
        this.body = [ this.pos , {x: this.pos.x -1, y: this.pos.y},
          {x: this.pos.x -2, y: this.pos.y},  {x: this.pos.x - 3, y: this.pos.y} ];
        
        this.isDeath = false;
        this.fitness = 0;
        this.lifeTime = 0;
        this.timeToDio = 100;
        this.neural = neural || new NeuralNet(shape);
    }
    update(){
        if(!this.isDeath){
            this.prediction();
            if(this.pos.x == this.food.x && this.pos.y == this.food.y){
                this.timeToDio += 50;
                this.food = {
                    x: Math.floor(Math.random()*Width),
                    y: Math.floor(Math.random()*Height)
                }
                this.length++;
            }
            for(let i = this.length - 1; i > 0 ; i--){
                this.body[i] = {x:this.body[i-1].x, y:this.body[i-1].y};
            }
            this.pos.x += this.direct.x;
            this.pos.y += this.direct.y;
            
            if(this.pos.x >= Width  ||this.pos.x < 0 ||
               this.pos.y >= Height ||this.pos.y < 0  ){
                   this.isDeath = true
            };
            for(let i = 1; i<this.body.length;i++){
                if(this.body[i].x == this.pos.x && this.body[i].y == this.pos.y){
                    this.isDeath = true;
                    break;
                }
            }
            this.timeToDio--;
            this.lifeTime++;
            if(this.timeToDio <= 0){
                this.isDeath = true;
            }
        }
    }
    draw(){
        if(!this.isDeath){
            ctx.fillStyle = "#fff"; 
            for(let i = 0; i < this.length; i++){
                ctx.fillRect(this.body[i].x*whBlock + 1,this.body[i].y*whBlock + 1,
                    whBlock-2,whBlock-2);
            }
            ctx.fillStyle = "#f00";
            ctx.fillRect(this.food.x*whBlock,this.food.y*whBlock,whBlock,whBlock);
        }
    }
    copy(){
        return new Snake(15,15,this.neural.copy());
    }
    mutate(mutationRate){
        for(let wei of this.neural.weight){
            for(let i = 0; i < wei.rows; i++){
                for(let j = 0; j < wei.cols; j++){
                    if(Math.random() < mutationRate){
                        wei.matrix[i][j] = Math.floor(Math.random()*200 - 100);
                    }
                }
            }
        }
    }
    setDirection(index){
        switch(index){
            case 0: //w
                this.direct.x = 0;
                this.direct.y = -1;
                break;
            case 1: //s
                this.direct.x = 0;
                this.direct.y = 1;
                break;
            case 2: //d
                this.direct.x = 1;
                this.direct.y = 0;
                break;
            case 3: //a
                this.direct.x = -1;
                this.direct.y = 0;
                break;
        }
    }
    getValues(){
        var directs = [{x:0,y:-1},{x:0,y:1},{x:1,y:0},{x:-1,y:0}]; //w,s,d,a
        var values = [0,0,0,0,0,0,0,0];
        var index = 0;
        for(let direct of directs){
            let pos = {x:this.pos.x,y:this.pos.y};
            let Dist = 0;
            let foundFood = false, foundObs = false;
            while(!foundObs && pos.x >= 0 && pos.y >=0 && pos.x < Width && pos.y < Height){
                pos.x += direct.x;
                pos.y += direct.y;
                Dist++;
                if(!foundFood && this.food.x == pos.x && this.food.y == pos.y){
                    values[index+4] = 100;
                    foundFood = true;
                }
                for(let piece of this.body){
                    if(pos.x == piece.x && pos.y == piece.y){
                        foundObs = true;
                        break;
                    }
                }
            }
            values[index] = Dist;
            index++;
        }
        return values;
    }
    calcFitness(){
        this.fitness = Math.pow(this.length,2)*this.lifeTime;
        return this.fitness;
    }
    prediction(){
        var values = this.getValues();
        var predict = this.neural.prediction(values);
        const {index} = predict.maxValue();
        this.setDirection(index.col);
    }
}