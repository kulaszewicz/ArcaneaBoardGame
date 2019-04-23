import { BoardEvents } from "./boardEvents.js";


class HexMap2 {

    constructor(difficulty, numOfBoss, isActive) {
        this.difficulty = difficulty;
        this.numOfBoss = numOfBoss;
        this.isActive = isActive;
    };

    HexProps = {
        moveHistory: [[4,0,0]], // direction, x, y
        stuck: 0,
        skips:0,
    };



    generateMap = () => {
        console.log('Started generating');

        const HexCompass = this.setCompass(this.setCompassSize()[0]);

        const size = this.setCompassSize()[1];
        console.log(size);

        console.log(HexCompass);

        // Events
        const eventArray = new BoardEvents(size).generateBoardEvents();

        this.hexNextMove(this.HexProps.moveHistory, 1, (size-1), HexCompass, eventArray);






        console.log('Generating has ended');

        console.log(this.HexProps.stuck + " times stuck");
        console.log(this.HexProps.skips + " times skipped");
        console.log(this.HexProps.moveHistory );
    };

    hexNextMove = (moveHistory, index, size, HexCompass, eventArray) => {

        if (index > size) {
            console.log("END");
            this.drawMap(this.HexProps.moveHistory, eventArray);
        }
        else {

            let cDir, rDir; // Chosen direction, Random direction

            const lastHexDirection = moveHistory[(index - 1)][0]; // Direction of last generated hex

            rDir = Math.floor((Math.random() * 3) + 1);


            cDir = this.chosenDirection(lastHexDirection, rDir);


            if (cDir === 0) {
                cDir = HexCompass[5].slice(0); // Have to copy the value not refer to
            } else if (cDir === 7) {
                cDir = HexCompass[0].slice(0);
            } else {
                cDir = HexCompass[(cDir - 1)].slice(0);
            }
            this.hexSetMove(cDir, moveHistory, index, size, HexCompass, eventArray);
        }

    };

    chosenDirection = (lastDirection, rDirection) => {
      switch (rDirection) {
          case 1:
              return (lastDirection + 1);
          case 2:
              return (lastDirection - 1);
          default:
              return lastDirection;
      }
    };

    hexSetMove = (cDir, moveHistory, index, size, HexCompass, eventArray) => {

        if (this.HexProps.stuck >= size || this.HexProps.skips >= (size*2)){
            this.hexMapReset(size, HexCompass, eventArray);
        } else {

            //console.log(cDir);
            const lastDirection = index > 0 ? moveHistory[(index - 1)][0] : moveHistory[index][0];
            const proposedHex = [cDir[0], cDir[1] + moveHistory[(index - 1)][1], cDir[2] + moveHistory[(index - 1)][2]];

            if (this.sizeValidator(proposedHex) && this.loopValidator(proposedHex, moveHistory) && this.attachedValidator(proposedHex, moveHistory, index)) {

                //console.log("good");
                //console.log(JSON.parse(JSON.stringify(this.HexCompass)));
                this.HexProps.moveHistory.push(proposedHex);
                index++;
                this.hexNextMove(moveHistory, index, size, HexCompass, eventArray);

            } else if (this.sizeValidator(proposedHex, moveHistory, index) === false && lastDirection === 1 || lastDirection === 4 && index !== 1) {
                //console.log("stuck");
                this.HexProps.stuck++;
                moveHistory.pop();
                index--;
                this.hexNextMove(moveHistory, index, size, HexCompass, eventArray);
            }else if (this.attachedValidator(proposedHex, moveHistory, index) === false) {
                console.log('attached');
                moveHistory.pop();
                index--;
                this.hexNextMove(moveHistory, index, size, HexCompass, eventArray);
            }
            else {
                //console.log("skip");
                this.HexProps.skips++;
                this.hexNextMove(moveHistory, index, size, HexCompass, eventArray);
            }
        }
    };


    drawMap = (moveHistory, eventArray) => {

        const generatedMap = moveHistory;
        //Drawing hexes based on generated array
        for (let i = 0; i < generatedMap.length; i++){
            let curr = document.createElement('hex');
            let currEvent = document.createElement('hexEvent');
            curr.style.setProperty("--currLeft", generatedMap[i][1] + "%");
            curr.style.setProperty("--currBottom", generatedMap[i][2] + "%");
            curr.style.setProperty("--setSize", this.setCompassSize()[0] + "%");
            //curr.innerHTML = `${i+1} ${eventArray[i].name}`;
            currEvent.style.setProperty("--eventImg", eventArray[i].eventImg);
            if (i===0) curr.style.animation = "glowing 1500ms infinite";
            curr.className = "hex";
            currEvent.className = "hexEvent";
            curr.appendChild(currEvent);
            let frame = document.getElementById("frame");
            frame.appendChild(curr);
        }

    };

    // Validators

    sizeValidator = (proposedHex) => {
        const tempPossLeft = proposedHex[1];
        const tempPossBottom =  proposedHex[2];

        return !(tempPossLeft < 0 || tempPossLeft > 95 || tempPossBottom < 0 || tempPossBottom > 95);
    };

    loopValidator = (proposedHex, moveHistory) => {
        const tempPossLeft = proposedHex[1];
        const tempPossBottom =  proposedHex[2];

        for (let i = 1; i < moveHistory.length; i++){
            //console.log(tempPossLeft+" X");
            //console.log(tempPossBottom+" Y");
            if (tempPossLeft === moveHistory[i-1][1] && tempPossBottom === moveHistory[i-1][2]){/// Search hex positions history and look if there is one with same coordinates
                return false;
            }
        }
        return true;
    };

    attachedValidator = (proposedHex, moveHistory, index) => {
        const tempPossLeft = proposedHex[1];
        const tempPossBottom =  proposedHex[2];

        for (let i = 1; i < moveHistory.length; i++){
            if ((tempPossLeft - moveHistory[i-1][1]) < 3 && (index - i) > 3){
                return false;
            }else if((tempPossBottom - moveHistory[i-1][1]) < 3 && (index - i) > 3){
                return false;
            }
        }
        return true;
    };
    // Hard reset

    hexMapReset = (size, HexCompass, eventArray) => {
        console.log("HARD RESET");
        this.HexProps.stuck = 0;
        this.HexProps.skips = 0;
        this.HexProps.moveHistory = [[4,0,0]];
        this.hexNextMove(this.HexProps.moveHistory, 1, size, HexCompass, eventArray);
    };

    setCompassSize = () => {
        switch (this.difficulty) {
            case 1:
                return  [8, 20];
            case 2:
                return  [6, 35];
            case 3:
                return  [4, 50];
            default:
                return  [8, 20];
        }
    };

    setCompass = (size) => {
        return [
            //Moves (move index, left, bottom), start has index of 0 and end 7
            [1, 0, -size], // S
            [2, (-0.75)*size, (-0.5)*size], // SW
            [3, (-0.75)*size, (0.5)*size], // NW
            [4, 0, size], // N
            [5, (0.75)*size ,(0.5)*size], // NE
            [6, (0.75)*size, (-0.5)*size] // SE
        ];
    }

}

const testMap = new HexMap2(1, 2, true);

testMap.generateMap();

