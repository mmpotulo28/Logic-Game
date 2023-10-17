const logicDirs = document.querySelectorAll('.logic-dir');
const playDirs = document.querySelectorAll('.play-dir');
const gridCells = document.querySelectorAll('.grid-cell');

//reference play buttons
const playBtn = document.querySelector('#play-btn');
const resetBtn = document.querySelector('#reset-btn');

let playDirArr = [];
let startCellId = 0

//maize paterns
const pattern1 = [6, 7, 12, 13, 14]
const pattern2 = [1, 2, 3, 8, 13]
const patten3 = [17, 18, 13, 14, 9]
const pattern4 = [22, 23, 18, 13, 14]
let currentPattern = pattern1;

//randomize choose maize pattern
let randomNum = Math.floor(Math.random() * 4);
console.log("random: " + randomNum);
if (randomNum == 0) {
    currentPattern = pattern1;
} else if (randomNum == 1) {
    currentPattern = pattern2;
} else if (randomNum == 2) {
    currentPattern = patten3;
} else {
    currentPattern = pattern4;
}

//set maize pattern on grid
gridCells.forEach((gridCell) => {
    if (currentPattern.includes(parseInt(gridCell.id))) {
        console.log(gridCell.id);
        gridCell.style.backgroundColor = 'lightgrey';
        gridCell.style.border = '1px solid grey';
    }
});

//set start cell
startCellId = currentPattern[0];
gridCells.forEach((gridCell) => {
    if (gridCell.id == startCellId) {
        gridCell.classList.add('active');
        gridCell.innerText = '*';
    }
});

logicDirs.forEach((logicDir) => {
    logicDir.addEventListener('click', () => {
        let dir = logicDir.innerText;
        playDirArr.push(dir);

        //loop trhough the array and add each element to the playDirs
        for (let i = 0; i < playDirArr.length; i++) {
            playDirs[i].innerText = playDirArr[i];
        }
    });
});

//play button
playBtn.addEventListener('click', () => {
    //get the grid cell with an * as innerText
    gridCells.forEach((gridCell) => {
        if (gridCell.innerText === '*') {
            gridCell.classList.add('active');
            startCellId = gridCell.id;
            // alert(startCellId);
        }
    });

    playLogic(startCellId, playDirArr)
});

//reset button
resetBtn.addEventListener('click', () => {
    playDirArr = [];
    playDirs.forEach((playDir) => {
        playDir.innerText = '';

        //remove the active class from all the grid cells
        gridCells.forEach((gridCell) => {
            if (gridCell.id == startCellId) {
                gridCell.classList.add('active');
                gridCell.innerText = '*';
            } else {
                gridCell.classList.remove('active');
                gridCell.innerText = '';
            }

        });
    });
});

//play logic
function playLogic(currentID, playDirArr) {

    //loop through the directions array
    for (let i = 0; i < playDirArr.length; i++) {

        if (playDirArr[i] === '^') {
            //move the current cell to the next forward cell
            currentID = parseInt(currentID) + 1;

            //check if the current cell is not in the pattern
            if (!currentPattern.includes(currentID)) {
                alert('Wrong Move! you lose');
                break;
            } else {
                move(currentID)
            }

        } else if (playDirArr[i] === '>') {
            //move the current cell to the next down cell
            currentID = parseInt(currentID) + 5;

            //check if the current cell is not in the pattern
            if (!currentPattern.includes(currentID)) {
                alert('Wrong Move! you lose');
                break;
            } else {
                move(currentID)
            }

        } else if (playDirArr[i] === "<") {
            //move the current cell to the next up cell
            currentID = parseInt(currentID) - 5;

            //check if the current cell is not in the pattern
            if (!currentPattern.includes(currentID)) {
                alert('Wrong Move! you lose');
                break;
            } else {
                move(currentID)
            }
        }

    }

    //check for win
    checkForWin(currentID);
}

//move object function
function move(currentID) {
    //set the  the grid cell at current ID to have the text *
    gridCells.forEach((gridCell) => {
        if (gridCell.id === currentID.toString()) {
            gridCell.classList.add('active');
            gridCell.innerText = '*';
        } else {
            gridCell.classList.remove('active');
            gridCell.innerText = '';
        }
    });
}


//check for win function
function checkForWin(currentID) {
    //check if the current cell is the last cell
    if (currentID == currentPattern[currentPattern.length - 1]) {
        alert('You Win!');
    }
}