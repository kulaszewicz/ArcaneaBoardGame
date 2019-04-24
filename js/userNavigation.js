import {removeGlow} from './viewDOMGeneration.js'
import {addGlow} from "./viewDOMGeneration.js";
import {glowChain} from "./viewDOMGeneration.js";

export default class UserNavigation {

    constructor(moveHistory, eventArray){
        this.moveHistory = moveHistory;
        this.eventArray = eventArray;
        this.boardSize = this.moveHistory.length;
        this.startingPosition = 0;
        this.endPosition = this.boardSize-1;
        this.currPosition = this.startingPosition;
    };




    throwDice = () => {
        let diceScore = (Math.floor(Math.random()*6)+1);
        removeGlow(this.currPosition);

        //console.log(diceScore+" score");

        if (this.checkPosition(diceScore)) {
            let timeout = ((diceScore*1000)+100);

           if (diceScore !== 1) glowChain(this.currPosition, this.currPosition+diceScore);

           this.currPosition += diceScore;

            setTimeout(()=>{
                addGlow(this.currPosition);
            },timeout);

        } else {
            let timeout = (((this.endPosition-this.currPosition)*1000)+100);
            if (diceScore !== 1) glowChain(this.currPosition, this.endPosition);

            this.currPosition = this.endPosition;

            setTimeout(()=>{
                addGlow(this.endPosition);
            },timeout);
            console.log("This is the end.");
        }
        this.isEvent(this.currPosition);

        //console.log(this.currPosition);

        //console.log(diceScore);
    };


    // Validators

    checkPosition = (diceScore) => {
        let newPosition = this.currPosition + diceScore;
        return newPosition < this.endPosition+1;
    };

    isEvent = (currPosition) => {
        if (this.eventArray[currPosition].name !== undefined){
            //  <=== BLOCK MOVEMENT UNTIL EVENT IS DONE FUNCTION HERE
           console.log(`${this.eventArray[currPosition].name} event!`);// For now this,later ref to play the event

        } else console.log(`No event for you, move along`);
    }
}



