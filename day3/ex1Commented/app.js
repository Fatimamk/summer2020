// contact class
//classes uses the constructor function first with parameters for variable
// the then methods are added below constructor if there are any
class Contact {
    constructor(name, number, email) {
        this.name = name;
        this.number = number;
        this.email = email;
    }
    //basically making an empty object "this" then storing the values inside it

}

//UI Class
class UI {
    addContact(contact) {
        const list = document.getElementById("contact-list");
        //list is the t-body id - where info is being added to
        const row = document.createElement("tr");
        //creating a table row in the document then filling the new row
        row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.number}</td>
        <td>${contact.email}</td>
        <td><a class="delete" style="cursor: pointer;">x</a></td>
        `;
        list.appendChild(row);
        //list in the parent item, row is the child node
        //what happens without this>
    }
    //unlike an object literal, you don't need a comma here
    //methods that come with this class
    clearFields() {
        document.getElementById("name").value = " ";
        document.getElementById("number").value = " ";
        document.getElementById("email").value = " ";
    }
    //another method - not sure what this one is doing
    deleteContact(target) {
        if (target.className === "delete") {
        //     //clicking anywhere on table triggers this event so need to check it's the 4th one
        //     // the only one with .delete
        target.parentElement.parentElement.remove();
        //     //anchor parent = td. td parent = tr

        //     // try making it delete a row by clicking on the table - yes but it deletes all of them(have to comment out 1 }) -instead use target.parentElement.remove();
        target.parentElement.parentElement.remove();


        

        }
    }
}
// const list = document.getElementById("contact-list");
// console.log(list);
// $ <tbody id = "contact-list"></tbody>

// contact is a const created when event picked up by event listeners

//event listeners (they're callback functions i think[if func e was defined out of this func then fed in])
document.getElementById("contact-form").addEventListener("submit", function(e){
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value

    const contact = new Contact(name, number, email);
    // contact created here using constructor function
    // new creates empty object, set value of 'this' to be new empty object, calls the constructor method

    const ui = new UI();
    //UI only has methods so no parameters passed in?, ui created with those methods
    ui.addContact(contact);
    //using the ui addContact method, passing in newly created contact object, serves as parameters for add Contact()
    ui.clearFields();
    //calling the ui clear fields method. [getting rid of the stuff the user has written down in input but ui still exists until we make a new version by submitting again]
    e.preventDefault();
    //something about the page not refreshing - idek why this is here
});

//ui still exists so we can't add anymore rows unti we get rid of it. basically a temp vehicle

//delete contact
document.getElementById("contact-list").addEventListener("click", function(e){
    // when contact-list [the table] clicked, function(e) runs
    const ui = new UI();
    //creates ui again (is it in case you click the form before ui is made somehow. what happens if you delete?)
    ui.deleteContact(e.target);
    //ui method with e.target as parameter
//     Get the element that triggered a specific event:
// e.g.  alert(event.target);
//clicking that area of the table caused this method to be triggered
    e.preventDefault();

})

