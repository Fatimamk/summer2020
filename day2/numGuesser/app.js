//hid the spinning icon
//query selector finds html elements by css selectors
// don't want tspinner to be there when you load page
// try out document.getElementByClassName
document.querySelector('.spinner-border').style.display='none';

//listen for sumbit event
document.getElementById('loan-form').addEventListener('submit', function(e){
    //event listener - submit= what it listens out for, function(e) - what it does. I think you can put function e somewhhere else
    //function(e) {} normal parameter for js event handling functions
    document.getElementById('results').style.display= 'none';
    //can you put this at the top with spinning border?
    document.querySelector('.spinner-border').style.display= 'block';
    //Spinner made visible while results loading. will keep spinning till end of calculate
    setTimeout(calculateResults, 2000);
    //The setTimeout() method calls a function or evaluates an expression
    //after a specified number of milliseconds.
    e.preventDefault();
    //Calling preventDefault() during any stage of event flow cancels the event, meaning that any default action normally taken by the implementation as a result of the event will not occur.
    //prevents browser from performing default action for that element
});

//next function blog called by setTimeout


//calculate results
function calculateResults(){
    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const years = document.getElementById('years').value;
    //gets values from html and makes them constants in js

    let totalReturn = document.getElementById('total-return');
    let totalInterest = document.getElementById('total-interest');
    //these are the disabled inputs - at this stage they'll be undefined

    totalReturn.value = (amount*(1 + ((interest*years)/100))).toFixed(2);
    //inside total return object the value of this calculation is stored
    totalInterest.value = (totalReturn.value - amount).toFixed(2);

    document.getElementById('results').style.display = 'block';
    //makes results visible
    document.querySelector('.spinner-border').style.display = 'none';
    //hide spinner again
}
    
