export default class ViewDOMGeneration {

    constructor(moveHistory, eventArray, hexSize){
        this.moveHistory = moveHistory;
        this.eventArray = eventArray;
        this.hexSize = hexSize;
    }

    drawMap = () =>{
        const generatedMap = this.moveHistory;
        const generatedEvents = this.eventArray;
        const generatedHexSize = this.hexSize;

        for (let i = 0; i < generatedMap.length; i++){
            let curr = document.createElement('hex');
            let currEvent = document.createElement('hexEvent');

            curr.style.setProperty("--currLeft", generatedMap[i][1] + "%");
            curr.style.setProperty("--currBottom", generatedMap[i][2] + "%");
            curr.style.setProperty("--setSize", generatedHexSize + "%");

            currEvent.style.setProperty("--eventImg", generatedEvents[i].eventImg);

            //if (i===0) curr.style.animation = "glowing 1500ms infinite";
            curr.className = "hex";
            curr.id += `hex-${i}`;
            currEvent.className = "hexEvent";
            curr.appendChild(currEvent);

            let frame = document.getElementById("frame");
            frame.appendChild(curr);
        }
    };




}

//NAVIGATION

    export const removeGlow = (position) => {
        const curr  = document.getElementById(`hex-${position}`);
        curr.classList.remove("currPosition");
    };

    export const addGlow = (currPosition) => {
        const curr = document.getElementById(`hex-${currPosition}`);
        curr.className += " currPosition";
    };

    export const glowChain = (position, newPosition) => {

        let i = (position+1);

        let singleGlow = () => {
            setTimeout(()=> {
                let curr = document.getElementById(`hex-${i}`);
                curr.className += " singleGlow";
                setTimeout(() => {
                    curr.classList.remove("singleGlow");
                }, 1000);

                i++;
                if (i<newPosition) {
                    singleGlow();
                }
            }, 1000);
        };

        singleGlow();

    };