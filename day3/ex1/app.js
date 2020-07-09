console.log("Testing");

function Contact(name, telNumber, email) {
    this.name=name;
    this.telNumber = telNumber;
    this.email = email;
}

function UI () {}

UI.prototype.addContact = function(contact) {
    console.log("Adding contact from the ui", contact);
}


// //these are the same thing
// document.getElementById("contactForm").addEventListener('submit', function(e){
//     console.log('submitted');

// });

// //e part of a callback function
// const submittedFn = function (e) {
//     console.log("submitted");
// }

// contactForm.addEventListener("submit", submittedFn);


//event listeners
document.getElementById('contactForm').addEventListener("submit", function (e) {
    e.preventDefault();
    console.log('submitted');


const nameElement = document.getElementById("name");
const telNumberElement = document.getElementById("telNumber"),
    emailElement = document.getElementById('email');
console.log(nameElement, telNumberElement, emailElement);

const name = nameElement.name.value;
const telNumber = telNumberElement.value;
const email = emailElement.value;
console.log (name, telNumber, email)

const contact = new Contact(name, telNumber, email);
console.log(contact);

const ui = new UI();
ui.addContact(contact);
});

