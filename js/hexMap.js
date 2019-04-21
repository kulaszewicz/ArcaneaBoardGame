{

    const HexCompass = {
        moveHistory: [],
        stuck: 0,
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
        let Hex = new HexInst(0, [0, 0], [0, 0], true); // 1st Hex bottom left
        HexCompass.moveHistory.push([0,0]);
        for (let i = 0; i < 20; i++){
            Hex.NextMove(HexCompass);
        }

        for (let i = 0; i < HexCompass.stuck; i++){
            Hex.NextMove(HexCompass);
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


        Hex.DrawMap();

        console.log('Generating has ended');

        console.log(HexCompass.moveHistory);
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

        if(this.lastDirection === 0){ // Start
            if (rPath0 === 1) {
                cPath = compass.N;
            } else cPath = compass.NE;
            this.SetMove(cPath);

        } else if (this.lastDirection === 1){ //S
            if(rPath === 1){
                cPath = compass.SW;
            } else  if (rPath === 2) {
                cPath = compass.S;
            } else cPath = compass.SE;
            this.SetMove(cPath);

        } else if (this.lastDirection === 2){ // SW
            if(rPath === 1){
                cPath = compass.NW;
            } else  if (rPath === 2) {
                cPath = compass.SW;
            } else cPath = compass.S;
            this.SetMove(cPath);

        }else if (this.lastDirection === 3){ // NW
            if(rPath === 1){
                cPath = compass.N;
            } else  if (rPath === 2) {
                cPath = compass.NW;
            } else cPath = compass.SW;
            this.SetMove(cPath);

        } else if (this.lastDirection === 4){ // N
            if(rPath === 1) {
                cPath = compass.NW;
            } else  if (rPath === 2) {
                cPath = compass.N;
            } else cPath = compass.NE;
            this.SetMove(cPath);
        } else if (this.lastDirection === 5){ // NE
            if(rPath === 1){
                cPath = compass.N;
            } else  if (rPath === 2) {
                cPath = compass.NE;
            } else cPath = compass.SE;
            this.SetMove(cPath);

        } else if (this.lastDirection === 6){ // SE
            if(rPath === 1){
                cPath = compass.NE;
            } else  if (rPath === 2) {
                cPath = compass.SE;
            } else cPath = compass.S;
            this.SetMove(cPath);

        }

    };

    /**
     * @return {boolean}
     */
    HexInst.prototype.SizeValidator = function(cPath)  {

        let tempPossLeft =  this.currPoss[0];
        let tempPossBottom =  this.currPoss[1];

        tempPossLeft += cPath[1];
        tempPossBottom += cPath[2];

        return !(tempPossLeft < 0 || tempPossLeft > 100 || tempPossBottom < 0 || tempPossBottom > 100);
    };

    /**
     * @return {boolean}
     */
    HexInst.prototype.LoopValidator = function(history, cP) {
        for (let i = 1; i < history.length; i++){
           if (cP[0] === history[i-1][0] && cP[1] === history[i-1][1]){ /// Search hex positions history and look if there is one with same coordinates
               return false;
           }
        }
        return true;
    };


    HexInst.prototype.isStuckValidator = function(history) {

    };

    HexInst.prototype.SetMove = function(cPath) {

        if (HexCompass.stuck > 20) this.Reset();
        else {
            if (this.SizeValidator(cPath) === true && this.LoopValidator(HexCompass.moveHistory, this.currPoss) === true) {
                this.lastDirection = cPath[0];
                this.currPoss[0] += cPath[1];
                this.currPoss[1] += cPath[2];


                HexCompass.moveHistory.push([this.currPoss[0], this.currPoss[1], this.lastDirection]);

            } else if (this.SizeValidator(cPath) === false && this.lastDirection === 1 || this.lastDirection === 4) {
                HexCompass.stuck++;

                HexCompass.moveHistory.pop();

                this.currPoss[0] = HexCompass.moveHistory[HexCompass.moveHistory.length - 1][0];
                this.currPoss[1] = HexCompass.moveHistory[HexCompass.moveHistory.length - 1][1];
                this.lastDirection = HexCompass.moveHistory[HexCompass.moveHistory.length - 1][2];

                this.NextMove(HexCompass);
            } else this.NextMove(HexCompass);
        }
    };

    HexInst.prototype.Reset = function (){
            console.log("reset");
            HexCompass.moveHistory = 0;
            this.currPoss[0] = 0;
            this.currPoss[1] = 0;
            this.lastDirection = 0;
            this.NextMove(HexCompass);
    };

    HexInst.prototype.DrawMap = function () {

        const generatedMap = HexCompass.moveHistory;
        //Drawing single hex
        for (let i = 0; i < generatedMap.length; i++){
            let curr = document.createElement('hex');
            curr.style.setProperty("--currLeft", generatedMap[i][0] + "%");
            curr.style.setProperty("--currBottom", generatedMap[i][1] + "%");
            curr.innerHTML = `${i}`;
            curr.className = "hex";
            let frame = document.getElementById("frame");
            frame.appendChild(curr);
        }
    };




    let testMap = new HexMap('Easy', 0, true);

    testMap.generateMap();


}

