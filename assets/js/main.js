function meshPrinter(cellId, input){

    document.getElementsByClassName(cellId)[0].value = input;
}

function randomNumberSelector(input_array){
    //done
    return input_array[Math.floor(Math.abs(Math.random() * input_array.length - 1)) + 1];
}

function cellId(row, column){
    //done
    return(String(row).concat(String(column)));

}

function cellDataFromId(row, col){
    return(document.getElementsByClassName(cellId(row, col))[0].value)
}

function baseArray(){
    var output = [];
    for(var i = 1; i <= 9; i++){
        output[i] = i
    }
    return(output)
}


function itemPopper(inputArray, del){
        return(inputArray.splice(inputArray.indexOf(del), 1));
}


function arrayRandomizer(inputArray){
    var numberSel = 0;
    output = [];

    i = 1;

    while(inputArray.length != 1){
        numberSel = randomNumberSelector(inputArray);
        itemPopper(inputArray, numberSel);
        output[i] = numberSel;
        i++;

    }
    return(output)    
}

function meshPopulator(input, cols){

    for(var row = 1; row <= input.length - 1; row++){
        meshPrinter(cellId(row, cols), input[row]);
    }
}

function colsGenerator(){
    output = [];
    inSitun = [];

    for(var i = 1; i <= 9; i++){
        inSitun[i] = baseArray();
    }

    for(var cols = 1; cols <= 9; cols++){
        inSitun[cols] = arrayRandomizer(inSitun[cols]);
    }

    return(inSitun);
}

function colsPopulator(input){

    for(var cols = 1; cols <= 9; cols++){

        meshPopulator(input[cols], cols);

    }

}


function _2dArrayTransposeColsToRow(input, row){
    
    output = [];

        for(var cols = 1; cols <= input.length - 1; cols++){

            output[cols] = input[cols][row];
        }

    return(output);
}


function arrayTransposer(input)
{

    output1 = [];

    for(var row = 1; row <= input.length - 1; row++){

        output1[row] = _2dArrayTransposeColsToRow(input, row);
    }
    return(output1)
}

function main(input){
    
    input.sort()

    var k = true;
    var m = 0;
    var n = 0;
    outputNonRepeated = [];
    outputRepeated = [];
    base = baseArray();

    for(var i = 0; i <= 9; i++){

        for(var j = 0; j <= i; j++){
            for(var j = i + 1; j <= 9; j++){
                
                if(input[i] == input[j]){
                    k = false;
                    outputRepeated[n] = input[i];
                    n += 1;
                    
                }

            }
        }

        if(k){
            outputNonRepeated[m] = input[i];
            m += 1;
        }
        else{
            k = true;
        }
    }

    for(var i = 0; i <= outputNonRepeated.length - 2; i++){
        itemPopper(base, outputNonRepeated[i])
    }

    return({missingData: base, outputRepeated: outputRepeated, outputNonRepeated: outputNonRepeated})
}

function colsSolver(input){

    inputTransposed = arrayTransposer(input);

    missingData = [];
    outputRepeated = [];
    outputRepeated = [];
    var inSitu = 0;

    for(var row = 1; row <= 9; row++){
        missingData = main(inputTransposed[row]).missingData;
        outputRepeated = main(inputTransposed[row]).outputRepeated;
        outputNonRepeated = main(inputTransposed[row]).outputNonRepeated;
        missingData.shift()


        for(var i = row; i <= outputRepeated.length - 1; i++){
            if(inputTransposed[row].lastIndexOf(outputRepeated[i]) != inputTransposed[row].indexOf(outputRepeated[i])){
                
                input[i].splice(input[i].indexOf(missingData[1]), 1, outputRepeated[i]);
                inputTransposed[row].splice(inputTransposed.indexOf(outputRepeated[i], missingData[1]));

                missingData.shift()
                
            }
        }
       
    }
    console.log(input)
    return(input)
}

meshData = colsGenerator();

console.log(meshData);

colsSolver(meshData);

function colsPopulatorPressed(){

    colsPopulator(meshData)
}

function newgame(){
    meshData = colsGenerator();
    colsPopulatorPressed();
}

function check(){
    meshData = colsSolver(meshData);
    newgame()
}

document.getElementById('start-btn').addEventListener('click', colsPopulatorPressed)
document.getElementById('new-btn').addEventListener('click', newgame)
document.getElementById('check-btn').addEventListener('click', check)