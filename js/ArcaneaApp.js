import MapGeneration from './mapGeneration.js';
import BoardEvents from './boardEvents.js';
import UserNavigation from './userNavigation.js';
import ViewDOMGeneration from './viewDOMGeneration.js';
import {addGlow} from "./viewDOMGeneration.js";

class ArcaneaApp {

    generateGame = (difficulty) => {

        // Map
        const newMap = new MapGeneration(difficulty);

        newMap.generateMap(); // GENERATE MAP SHAPE (each hex position and props)

        const moveHistory = newMap.HexProps.moveHistory;

        // Events
        const eventArray = new BoardEvents(newMap.setCompassSize()[1]).generateBoardEvents(); // GENERATE EVENTS ARRAY



        // Navigation
        const userNavigation = new UserNavigation(moveHistory, eventArray); // INITIALIZE ABILITY TO MOVE ON THE BOARD

        const throwDice = userNavigation.throwDice;

        const dice = document.getElementById("btn-dice");

        dice.onclick = throwDice;


        // DOM

        const generatedView = new ViewDOMGeneration(moveHistory, eventArray, newMap.setCompassSize()[0]);

        generatedView.drawMap(); // DRAW MAP SHAPE AND EVENTS

        addGlow(userNavigation.startingPosition); // GLOW STARTING POSITION
    };

}

const temp = new ArcaneaApp;

temp.generateGame(1);