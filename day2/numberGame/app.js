/*
GAME FUNCTION:
    - Player must guess a number between min and max
    - Player gets a certain amounut of guesses
    - Notify player of guesses remaining
    - Notify the player of the correct answer if loses
    - Let player choose to play again
*/

// Creat our variables
// Game values

let min = 0,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
//declare multiple variables

//UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('.input-group-text'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');
//declare multiple consts

minNum.textContent = min;
maxNum.textContent = max;

// The textContent property sets or returns the text content of the specified node, and all its descendants.

// If you set the textContent property, any child nodes are removed and replaced by a single Text node containing the specified string.

// Note: This property is similar to the innerText property, however there are some differences:

// textContent returns the text content of all elements, while innerText returns the content of all elements, except for <script> and <style> elements.
// innerText will not return the text of elements that are hidden with CSS (textContent will).

//play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'input-group-text play-again') {
        //The target event property returns the element that originally triggered the event.
        //if the element that triggered this function's className is ...
        // check syntax of 'input-group-text play-again'
        window.location.reload();
        //.location is the URL
    }
});

//Event listener for button
//listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`please enter a number between ${min} and ${max}`, 'red');
        //what is red doing?
    }
    //end of validation

    //check if winning number
    if(guess === winningNum) {
        //game over, they won
        gameOver(true, `${winningNum} is correct!`);
        // game over function takes 2 parameters
    } else {
        //wrong number
        guessesLeft -=1;

        if(guessesLeft === 0) {
            // nested if statement
            //Gameover, lost
            gameOver(false, `Game over, the actual answer was ${winningNum}`);
        } else {
            //change border colour
            guessInput.style.borderColor = 'red';

            //clear input
            guessInput.value = " ";

            //announce it's wrong
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
        }
    }
});

/// game over function
function gameOver(won, msg){
    let color;
    // colour undef
    won === true ? color = 'green' : color = 'red';
    //ternary operator
    //colour now defined
    // won is a parameter of this function

    //disable input
    guessInput.disabled = true;

    //change border color if won
    guessInput.style.borderColor = color;
    //same but for text
    guessInput.style.color = color;
    // win message
    setMessage(msg);

    //play again
    guessBtn.innerHTML = 'play again?';
    //guessBtn.className += 'play-again'; this doesn't work
    guessBtn.className += ' play-again';
    // guessBtn.className = guessBtn.className + 'play-again' -- not sure here
}

//get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
//Math.floor(x) returns the value of x rounded down to its nearest integer:
//Math.random() returns a random number between 0 (inclusive), and 1 (exclusive):

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

//understand - max-min
//why does play-again need a space