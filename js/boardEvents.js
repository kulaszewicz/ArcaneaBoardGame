export default class BoardEvents {

    constructor(boardSize){
        this.boardSize = boardSize;
        this.emptyFields = (0.4*(boardSize-2));
        this.rowl = (0.6*(boardSize-2));
        this.bound = (boardSize-2);
        for (let i = 1; i < 7; i++) this.fieldTypes[i].frequency = this.fieldTypes[i].frequency.bind(this);



    };

    // FIELD TYPES ARRAY OF OBJECTS

    fieldTypes = [
        {name: "Start", frequency() {return 1}, bound: 0, eventImg:'url("../resources/start.png")'},

        {name: "Empty", frequency() {return (this.emptyFields)}, bound: 0 , eventImg:0},

        {name: "Fight", frequency() {return (0.3*(this.rowl))}, bound: 0 , eventImg:'url("../resources/fight.png")'},

        {name: "Decision", frequency() {return (0.3*(this.rowl))}, bound: 0 , eventImg:'url("../resources/decision.png")'},

        {name: "Trap", frequency() {return (0.15*(this.rowl))}, bound: 0 , eventImg:'url("../resources/trap.png")'},

        {name: "Treasure", frequency() {return (0.125*(this.rowl))}, bound: 0 , eventImg:'url("../resources/treasure.png")'},

        {name: "Shortcut", frequency() {return (0.125*(this.rowl))}, bound: 0 , eventImg:'url("../resources/shortcut.png")'},

        {name: "Boss", frequency() {return 1}, bound: 0 , eventImg:'url("../resources/boss.png")'},
    ];

    eventArray = [];

    generateBoardEvents = () => {
        this.eventArray.push(this.fieldTypes[0]); // Start
        let randomEvent;

        this.setBounds(7); //Setting bounds for each field

        //console.log(this.fieldTypes);

        for (let i = 1; i <= (this.boardSize-2); i++){ // Setting rest of events randomly on some percentage presets, based on bounds.
            randomEvent = ((Math.random() * (this.boardSize-2)));
            for (let j = 1; j < 7; j++){
                if (randomEvent >= this.fieldTypes[j].bound){
                    this.eventArray.push(this.fieldTypes[j]);
                    break;
                }
            }
            //console.log(randomEvent);
        }

        this.eventArray[(this.boardSize-1)] = this.fieldTypes[7]; // Boss

        //console.log(this.eventArray);

        return this.eventArray;

    };

    setBounds = (numOfEvents) => {
        let temp = this.bound;
        for (let j = 1; j < numOfEvents; j++) {
            temp -= this.fieldTypes[j].frequency();
            temp = parseFloat(temp.toFixed(4));
            this.fieldTypes[j].bound = temp;
        }
    }



}

const testEvents = new BoardEvents(50);

testEvents.generateBoardEvents();

