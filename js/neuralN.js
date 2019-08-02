class NeuralNet{
    constructor(shape,nerual,weight,basies){
        this.shape = shape;
        this.weight = [];
        this.basies = [];
        if(nerual){
            for(let k = 0; k < shape.length-1; k++){
                this.weight.push(new Matrix(shape[i],shape[i+1],(i,j) => {
                    return neural.weight[k].matrix[i][j];
                }));
                this.weight.push(new Matrix(1,shape[i+1],(i,j) => {
                    return neural.basies[k].matrix[1][j];
                }));
            }
        }else{
            if(weight && basies){
                this.weight = weight;
                this.basies = basies;
            }else{
                for(let i = 0; i < shape.length-1; i++){
                    this.weight.push(Matrix.randomInt(shape[i],shape[i+1],-100,100));
                    this.basies.push(new Matrix(1,shape[i+1]));
                }
            }
        }
    }
    prediction(value){
        if(value.length != this.shape[0]){
            throw "Unable to perform prediction";
        }
        value = new Matrix(1,this.shape[0],(i,j) => value[j]);
        for(let i = 0; i < this.shape.length -1; i++){
            value = value.mult(this.weight[i]).add(this.basies[i]);
        }
        return value;
    }
    copy(){
        var weight = [];
        var basies = [];
        for(let k = 0; k < this.shape.length -1; k++){
            const {rows,cols} = this.weight[k];
            weight.push(new Matrix(rows,cols, (i,j) => this.weight[k].matrix[i][j]));
            basies.push(new Matrix(1,cols, (i,j) => this.basies[k].matrix[0][j]));
        }
        return new NeuralNet(shape,undefined,weight,basies);
    }
    static crossover(mother,father){
        var weight = [];
        var basies = []
        for(let k = 0; k < mother.shape.length -1; k++){
            const {rows,cols} = mother.weight[k];
            let num = Math.floor(Math.random()*rows*cols);
            const func = (i,j) => {
                return i*rows+j < num ? mother.weight[k].matrix[i][j] : father.weight[k].matrix[i][j];
            }
            let mat = new Matrix(rows,cols,func);
            weight.push(mat);
            basies.push(new Matrix(1,mother.shape[k+1]));
        }
        return new Snake(15,15,new NeuralNet(shape,undefined,weight,basies));
    }
    
}