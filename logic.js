const dirOptions = document.querySelectorAll('.logic-dir');
const dirBoxex = document.querySelectorAll('.play-dir');
const gridCells = document.querySelectorAll('.grid-cell');

//reference play buttons
const playBtn = document.querySelector('#play-btn');
const resetBtn = document.querySelector('#reset-btn');

let dirBoxArr = [];
let startCellId = 0

//maize paterns
const pattern1 = [6, 7, 12, 13, 14]
const pattern2 = [1, 2, 3, 8, 13]
const patten3 = [17, 18, 13, 14, 9]
const pattern4 = [22, 23, 18, 13, 14]
let currentPattern = pattern1;

//human object
const humanObj = "<i class=\"fa-solid fa-child-reaching\"></i>";

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
        gridCell.innerHTML = humanObj;
    }
});

/************add choosen directions to the boxes********/
dirOptions.forEach((dirOption) => {
    dirOption.addEventListener('click', () => {
        let dir = dirOption.innerHTML;
        // get icon from the dirOption
        let icon = dirOption.querySelector('i');
        console.log(icon);
        //get class name of the icon remove the fa-solid class
        let iconClass = icon.className.split(' ')[1];
        console.log(iconClass);
        if (dirBoxArr.length != 4) {
            dirBoxArr.push(dir);
        }

        //loop trhough the array and add each element to the dirBoxex
        for (let i = 0; i < dirBoxArr.length; i++) {
            dirBoxex[i].innerHTML = dirBoxArr[i];
        }
    });
});

//play button
playBtn.addEventListener('click', () => {
    //play logic
    playLogic(startCellId, 0)

});

//reset button
resetBtn.addEventListener('click', () => {
    dirBoxArr = [];
    dirBoxex.forEach((dirBox) => {
        dirBox.innerHTML = '';

        //remove the active class from all the grid cells
        gridCells.forEach((gridCell) => {
            if (gridCell.id == startCellId) {

                gridCell.innerHTML = humanObj;
            } else {
                gridCell.classList.remove('active');
                gridCell.innerText = '';
            }
        });
    });
});

//play logic
function playLogic(currentID, i) {

    for (let i = 0; i < dirBoxArr.length; i++) {
        //get the class name of the icon in dirBoxArr
        let iconClass = dirBoxex[i].querySelector('i').className.split(' ')[1];
        // console.log(iconClass);

        if (iconClass === 'fa-arrow-up') {
            //move the current cell to the next forward cell
            currentID = parseInt(currentID) + 1;

            //check if the current cell is not in the pattern
            if (!currentPattern.includes(currentID)) {
                alert('Wrong Move! you lose');
            } else {
                //wait for function to finish moving the cell

            }

        } else if (iconClass === 'fa-turn-down') {
            //move the current cell to the next down cell
            currentID = parseInt(currentID) + 5;

            //check if the current cell is not in the pattern
            if (!currentPattern.includes(currentID)) {
                alert('Wrong Move! you lose');
                return;
            } else {
                move(currentID)
            }

        } else if (iconClass === 'fa-turn-up') {
            //move the current cell to the next up cell
            currentID = parseInt(currentID) - 5;


            //check if the current cell is not in the pattern
            if (!currentPattern.includes(currentID)) {
                alert('Wrong Move! you lose');
                return;
            } else {
                move(currentID)
            }
        }

        //check if the current cell is the last cell
        checkForWin(currentID);

    }

}

//move object function
function move(currentID) {
    //set the  the grid cell at current ID to have the text *
    gridCells.forEach((gridCell) => {
        if (gridCell.id === currentID.toString()) {
            gridCell.innerHTML = humanObj;
            console.log("Moved to Cell: " + gridCell.id);
        } else {
            gridCell.classList.remove('active');
            gridCell.innerHTML = '';
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