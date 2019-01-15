/*Returns a random integer between min and max, with a uniform distribution*/
function getRandomInt(min, max) {
    min = min;
    max = max;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Inserts a given color into the given html tags. Nothing returned.
 * @param {Array of 3 tags refering to the html color code} colorTag
 * @param {Array of 3 integers between 0 to 255} colorArr */
function assignColor(colorTag, colorArr) {
    for (var i = 0; i < 3; i++) {
        colorTag[i].innerHTML = colorArr[i];
    }
}

/* Returns an array of 3 integers between 0 and 255 */
function getColor() {
    var colorValue = [];
    for (var i = 0; i < 3; i++) {
        colorValue[i] = getRandomInt(0, 255);
    }
    return colorValue;
}

/* Takes an array of 3 integers and returns a string "rgb(###,###,###)" */
function getRGBString(colorArr) {
    var rgbString = "rgb(" + colorArr[0] + "," + colorArr[1] + "," + colorArr[2] + ")";
    return rgbString;
}

function newColors(numButtons) {
    for (var i = 0; i < colorButtons.length; i++) {
        if (i < numButtons) {
            colorValues[i] = getColor();
            colorButtons[i].style.backgroundColor = getRGBString(colorValues[i]);
        }
        else {
            colorButtons[i].style.backgroundColor = "black";
        }
    }
    answerNum = getRandomInt(0, numButtons - 1);
    assignColor(colorTitle, colorValues[answerNum]);
    header.removeAttribute("style");
    resultTag[0].classList.add("displayNone");
    resultTag[1].classList.add("displayNone");
}

function guess(buttonNum) {
    if (buttonNum === answerNum) {
        var rgbString = getRGBString(colorValues[answerNum]);
        for (var i = 0; i < difficulty; i++) {
            colorButtons[i].style.backgroundColor = rgbString;
        }
        header.style.backgroundColor = rgbString;
        resultTag[0].classList.add("displayNone");
        resultTag[1].classList.remove("displayNone");
    }
    else {
        colorButtons[buttonNum].style.backgroundColor = "black";
        resultTag[0].classList.remove("displayNone");
    }
}

function findDifficulty(tags) {
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].classList.contains("selected")) {
            return Number(tags[i].value);
        }
    }
    console.log("Error: No difficulty selected");
    return -1;
}

var colorTitle = document.querySelectorAll(".gameName span");
var colorButtons = document.querySelectorAll("#gameArea .colorButton");
var header = document.querySelector("#header");
var colorValues = [];
var answerNum = null;
var difficultyTag = document.querySelectorAll("#difficulty .menuText");
var difficulty = findDifficulty(difficultyTag);
var resultTag = document.querySelectorAll(".result");

newColors(difficulty);

for (let i = 0; i < difficulty; i++) {
    colorButtons[i].addEventListener("click", function () {
        guess(i);
    });
}

document.querySelector(".menuText").addEventListener("click", function () {
    newColors(difficulty);
});
difficultyTag[0].addEventListener("click", function () {
    difficultyTag[0].classList.toggle("selected");
    difficultyTag[1].classList.toggle("selected");
    difficulty = findDifficulty(difficultyTag);
    newColors(difficulty);
});
difficultyTag[1].addEventListener("click", function () {
    difficultyTag[0].classList.toggle("selected");
    difficultyTag[1].classList.toggle("selected");
    difficulty = findDifficulty(difficultyTag);
    newColors(difficulty);
});