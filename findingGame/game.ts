let roboCat = document.getElementById('btnRobo');
let otherSprite = document.getElementById('btnOtherSprite');
let timer = document.getElementById('timeBar');
let background = document.getElementById('background');
let arrayNumber = 0;
let scoreBar = document.getElementById('score');
let score = 0;
let btnReset = document.getElementById('btnReset');

//add in links here --> todo
let spriteArray = ["elephantUrl", "pigUrl"];


let activeSprite = spriteArray[0];
//restrict positions - will probs have to be changed --> probs todo
let leftMin = 10;
let leftMax = 80;

let topMin = 1;
let topMax = 85;


//these need to be added --> todo
let backgroundArray = ["https://www.jing.fm/clipimg/full/86-862909_forest-background-big-tree-clip-art.png","https://www.setaswall.com/wp-content/uploads/2017/06/Cartoon-Background-2560-x-1600-768x480.jpg"];

// background.style.backgroundImage = "url('https://static.vecteezy.com/system/resources/previews/000/151/708/original/free-factory-pollution-background-vector.jpg')";

background.style.backgroundImage = `url(${backgroundArray[arrayNumber]})`;


//positioning functions
function setLeftNumber () {
    let random = 100 * Math.random();
    while (random <= leftMin || random >= leftMax) {
        random = 100 * Math.random();
    }
    return random;
}

function setTopNumber () {
    let random = 100 * Math.random();
    while (random <= topMin || random >= topMax) {
        random = 100 * Math.random();
    }
    return random;
}
 
//this controls where the other sprite goes in relation to RoboCat --> probs todo 
function placeOtherSprite (leftNum, topNum) {
    if (leftNum - 20 > leftMin && topNum -20 > topMin) {
        doPosition (leftNum - 20, topNum - 20, otherSprite);
        // console.log("el");
    } else if (leftNum - 20 > leftMin && topNum -20 < topMin) {
        doPosition (leftNum-20, topNum + 20, otherSprite);

    } else if (leftNum - 20 < leftMin && topNum -20 > topMin) {
        doPosition (leftNum+20, topNum - 20, otherSprite);
    } else {
        // console.log(leftNum);
        // console.log(topNum);
    }
}

function doPosition (leftNum, topNum, sprite) {
    sprite.style.left = `${leftNum}%`;
    sprite.style.top = `${topNum}%`;
}


function setPosition() {
  //position robo cat
  let leftNum = setLeftNumber();
  let topNum = setTopNumber();
  //   console.log(leftNum, topNum);
  doPosition(leftNum, topNum, roboCat);

  placeOtherSprite(leftNum, topNum);
}


//background functions
function changeBackground () {
    if (arrayNumber < backgroundArray.length - 1) {
        arrayNumber ++;
        background.style.backgroundImage = `url(${backgroundArray[arrayNumber]})`;
    } else {
        arrayNumber = 0;
        background.style.backgroundImage = `url(${backgroundArray[arrayNumber]})`;
    }   
}


//score functions
function addScore () {
    score ++;
    scoreBar.value = score;
}

function decreaseScore() {
    score --;
    scoreBar.value = score;
}

//change sprite appearance
function changeSprite() {
    if (activeSprite == spriteArray[0]) {
        activeSprite = spriteArray[1];
    } else {
        activeSprite = spriteArray[0];
    }
    otherSprite.innerHTML = `<img src="${activeSprite}" />`;
}

//timer + what happens when timer runs out
function doCountdown () {
let seconds = timer.value;
let countdown = setInterval(function () {
    seconds --;
    timer.value = seconds;
    if (seconds <= 0) {
        clearInterval(countdown)
        timer.value = "Game Over!";
        scoreBar.value = "Your score is: "+score;
        btnReset.style.display = "block";
        roboCat.style.display = "none";
        otherSprite.style.display = "none";
    };
}, 1000);
};

doCountdown();



//robo cat event listener
roboCat.addEventListener("click", (e) => {
    // console.log("button pressed");
    e.preventDefault();
    setPosition();
    changeBackground();
    addScore();
    changeSprite();
});

//other sprite event listener
otherSprite.addEventListener("click", (e) => {
    e.preventDefault();
    decreaseScore();
    changeSprite();
    changeBackground();
    setPosition();
});

//when reset button pressed
btnReset.addEventListener("click", (e) => {
    timer.value = 30;
    doCountdown();
    btnReset.style.display = "none";
    // roboCat.style.display = "block";
    roboCat.style.removeProperty('display');
    // otherSprite.style.display = "block";
    otherSprite.style.removeProperty('display');
    score = 0;
    scoreBar.value = "Score : 0";
});
