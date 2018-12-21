


const HexMap = function (difficulty, numOfBoss, isActive) {
    this.difficulty = difficulty;
    this.numOfBoss = numOfBoss;
    this.isActive =isActive;
};


HexMap.prototype.generateMap = function () {
    console.log('Started generating');
    // Start
    const Start = new HexInst(0, 0, [0,0], [0,0], true);
    Start.DrawHex();
    let currHex = new HexInst(5, 0, [4,0], [0,0], false);
    currHex.DrawHex();

    if(this.difficulty === 'Easy'){
        //EasyMode
    }else if(this.difficulty ==='Medium'){
        //MediumMode
    }else if (this.difficulty === 'Hard'){
        //HardMode
    } else {
        console.log(`There was an error with handling the difficulty, you passed: ${this.difficulty}`);
    }

};


const HexInst = function (currDirection, lastDirection, currPoss, lastPoss, haveEvent) {

  this.currDirection = currDirection;
  this.lastDirection = lastDirection;
  this.currPoss = currPoss;
  this.lastPoss = lastPoss;
  this.haveEvent = haveEvent;

};


HexInst.prototype.DrawHex = function () {
  //Drawing single hex
    let curr = document.createElement('hex');
    curr.style.setProperty("--currLeft", this.currPoss[0] + "%");
    curr.style.setProperty("--currBottom", this.currPoss[1] + "%");
    curr.className = "hex";
    let frame = document.getElementById("frame");
    frame.appendChild(curr);

};

//hex1 = new HexInst(0, 0, [0,0], [0,0], false);
let testMap = new HexMap('Easy', 0, true);

testMap.generateMap();