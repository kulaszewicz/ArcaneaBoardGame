{

    const HexCompass = {
        moveHistory: [],
        //Moves (move index, left, bottom), start has index of 0 and end 7
        S: [1, 0, -4],
        SW: [2, -3, -2],
        NW: [3, -3, 2],
        N: [4, 0, 4],
        NE: [5, 3, 2],
        SE: [6, 3, -2]
    };


    const HexMap = function (difficulty, numOfBoss, isActive) {
        this.difficulty = difficulty;
        this.numOfBoss = numOfBoss;
        this.isActive = isActive;
    };


    HexMap.prototype.generateMap = function () {
        console.log('Started generating');
        // Start
        let Hex = new HexInst(0, [0, 0], [0, 0], true);
        Hex.DrawHex();
        HexCompass.moveHistory.push(0);
        for (let i = 0; i < 20; i++){
            Hex.NextMove(HexCompass);
            Hex.DrawHex();
            //HexCompass.moveHistory.push(move[0]);
        }

        if (this.difficulty === 'Easy') {
            //EasyMode - size of 20, 1 easy boss
        } else if (this.difficulty === 'Medium') {
            //MediumMode - size of 35, 1 medium boss
        } else if (this.difficulty === 'Hard') {
            //HardMode - size of 50, 1 easy/medium boss + 1 hard boss
        } else {
            console.log(`There was an error with handling the difficulty, you passed: ${this.difficulty}`);
        }

        console.log('Generating has ended');
    };


    const HexInst = function (lastDirection, currPoss, lastPoss, haveEvent) {

        this.lastDirection = lastDirection;
        this.currPoss = currPoss;
        this.lastPoss = lastPoss;
        this.haveEvent = haveEvent;

    };

    HexInst.prototype.NextMove = function (compass) {
        let cPath, rPath0, rPath;

        rPath0 = Math.floor((Math.random() * 2) + 1);
        rPath = Math.floor((Math.random() * 3) + 1);

        if(this.lastDirection === 0){
            if (rPath0 === 1) {
                cPath = compass.N;
            } else cPath = compass.NE;
            this.SetMove(cPath);

        } else if (this.lastDirection === 1){
            if(rPath === 1){
                cPath = compass.SW;
            } else  if (rPath ===2) {
                cPath = compass.S;
            } else cPath = compass.SE;
            this.SetMove(cPath);

        } else if (this.lastDirection === 2){
            if(rPath === 1){
                cPath = compass.NW;
            } else  if (rPath ===2) {
                cPath = compass.SW;
            } else cPath = compass.S;
            this.SetMove(cPath);

        }else if (this.lastDirection === 3){
            if(rPath === 1){
                cPath = compass.N;
            } else  if (rPath ===2) {
                cPath = compass.NW;
            } else cPath = compass.SW;
            this.SetMove(cPath);

        } else if (this.lastDirection === 4){
            if(rPath === 1) {
                cPath = compass.NW;
            } else  if (rPath ===2) {
                cPath = compass.N;
            } else cPath = compass.NE;
            this.SetMove(cPath);
        } else if (this.lastDirection === 5){
            if(rPath === 1){
                cPath = compass.N;
            } else  if (rPath ===2) {
                cPath = compass.NE;
            } else cPath = compass.SE;
            this.SetMove(cPath);

        } else if (this.lastDirection === 6){
            if(rPath === 1){
                cPath = compass.NE;
            } else  if (rPath ===2) {
                cPath = compass.SE;
            } else cPath = compass.S;
            this.SetMove(cPath);

        }

    };

    /**
     * @return {boolean}
     */
    HexInst.prototype.SizeValidator = function(cPath) {

        let tempPossLeft =  this.currPoss[0];
        let tempPossBottom =  this.currPoss[1];

        tempPossLeft += cPath[1];
        tempPossBottom += cPath[2];

        return !(tempPossLeft < 0 || tempPossLeft > 100 || tempPossBottom < 0 || tempPossBottom > 100);
    };

    HexInst.prototype.SetMove = function(cPath) {
        if (this.SizeValidator(cPath) === true){
            this.lastDirection = cPath[0];
            this.currPoss[0] += cPath[1];
            this.currPoss[1] += cPath[2];
        }
        else this.NextMove(HexCompass);
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



    let testMap = new HexMap('Easy', 0, true);

    testMap.generateMap();
}