// declare variables
let lives = document.querySelector('#lives'),
    points = document.getElementById('points'),
    movieForm = document.getElementById('movieForm'),
    //form id
    inputExplanation = document.getElementById('inputExplanation'),
    //top box where explanation appears
    inputGuess = document.getElementById('inputGuess'),
    hintMessage = document.querySelector('.btn-dark'),
    hintButton = document.querySelector('.btn-secondary'),
    successMessage = document.querySelector('.btn-success'),
    finalMessage = document.querySelector('#finalMessage');

points.value = 0;
lives.value = 2;

    let harryPotter= {title: 'Harry Potter', 
    explanation: 'This movie is about a dude with a stick...', 
    hint: 'It\'s Magic' };
    let justGo = {title: 'Just Go With It', explanation: 'This movie is about people who go on holiday...', hint: 'Adam, Drew and Jennifer'},
        neverBack = {title: 'Never Back Down', explanation: 'This movie is about two guys with daddy issues who beat each other up...', hint: 'Kanye West - Stronger'},
        spongeBob = {title: 'Spongebob Squarepants', explanation: 'This movie is about a rectangle...', hint: 'It\'s a cartoon'},
        fiftyFirst = {title: '50 First Dates', explanation: 'This movie is about a chick, she has the worst memory...', hint: '50 times...'},
        cars = {title: 'Cars', explanation: 'In this movie, car go fast...', hint: 'Kachow'},
        spider = {title: 'Spiderman', explanation: 'In this movie this guy just does not pay his rent, no matter how many times the landlord asks...', hint: 'Peta-Paka'},
        wolf = {title: 'The Wolf Of Wall Street', explanation: 'In this movie there\'s like illegal stuff, lots of money, and a blonde chick...', hint: 'AWOOooooooooooo goes the...'},
        inception = {title: 'Inception', explanation: 'In this movie everyone is like sleeping all the time...', hint: 'Dreams...'},
        peter = {title: 'Peter Pan', explanation: 'In this movie some kids die and an angel escorts them to heaven...', hint: 'Always flying, cuz he neverlands'};
        
        // make an array with all the consts at the end

let movieArray = [harryPotter, justGo, neverBack, spongeBob, fiftyFirst, cars, spider, wolf, inception, peter];

// console.log(movieArray[3].title)
// console.log(harryPotter.title);

// console.log(Math.floor(Math.random() * 10))

let randomNumber = Math.floor(Math.random() * 10);


function reset(){
    let randomNumber = Math.floor(Math.random() * 10);
    inputExplanation.value = movieArray[randomNumber].explanation;
    successMessage.value = movieArray[randomNumber].title;
    
    hintMessage.style.display = 'none';
    successMessage.style.display = 'none'; 
    finalMessage.style.display = 'none';  
}

reset()

//hint
hintButton.addEventListener('mousedown', function(e){
    hintMessage.value = movieArray[randomNumber].hint;
    hintMessage.style.display = 'block';
    
});

//submit guess function
movieForm.addEventListener('submit', function(e){
    // setTimeout(finalStep(), 10000);
    // e.preventDefault();
    finalStep();
});

function finalStep() {
    successMessage.style.display = 'block'; 
    finalMessage.style.display = 'block';
    if (inputGuess === movieArray[randomNumber].title) {
        points.value +=1;


        setTimeout(reset(), 20000);
    } else {
        lives.value -=1;
        
        if (lives.value == 0){
            finalMessage.value = "That's wrong - Game over!";
            setTimeout(reset(), 20000);
            lives.value = 2;
            points.value = 0;
        } else {
            finalMessage.value= `That's wrong, you still have ${lives} lives`;
        }
    }
};