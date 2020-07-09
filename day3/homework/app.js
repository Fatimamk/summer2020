// Need a Task class and UI
// UI Class need have methods -add rows(also needs to add it "edit") -clear fields -edit rows

// event listener for when + is pressed -> (get info from inputTask, make a task const with the new keyword)
// make a new Ui, doesn't need parameters as class only has methods. use the ui method add rows to write in taskList.task
// ui method to clear fields and finally prevent default

// edit function - for where the thing is clicked would be td so parent element tr then tr.tasks - check in playground if that works
// might be easier if when edit is press another input bar with edit task appears below then sumbit that one, get data from there
// pass into innerhtml of target

// if time - make the cursor more fun



class Task {
    constructor(taskName) {
        this.taskName = taskName;
    }
}
// let editButtonElement = document.getElementById("editBtn");

class UI {
    addTask(task) {
        const myTable = document.getElementById("taskTable");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${task.taskName}</td>
        <td><a class="editingClass" style="cursor: pointer;">| edit |</a></td>
        `;
        myTable.appendChild(row);
    }
    clearField() {
        document.getElementById("inputTask").value = " ";
    }
    editRow(target) {
        if (target.className == "editingClass") {
            // console.log("pls");
            let editInputElement = document.getElementById("editInput");
            editInputElement.disabled = false;
            // if () {
            //     console.log("seriously");
            //     //if edit buton pressed
            //     //do some inner html on parent of target then child of parent

            }
        // } else {console.log("whoops")}
    }
}

document.getElementById('plusBtn').addEventListener("click", function(e){
    const taskName = document.getElementById("inputTask").value;

    const task= new Task (taskName);

    const ui = new UI();
    
    ui.addTask(task);
    
    ui.clearField();
    
    e.preventDefault();
});


// pass into innerhtml of target
//id=editForm + editInput
// make placeholder the original task

document.getElementById("taskTable").addEventListener("click", function(e){
    
    const ui = new UI();
    ui.editRow(e.target);
    e.preventDefault();

})

// document.getElementById("editBtn").addEventListener("click", function(e){
    
//     const ui = new UI();
//     ui.editRow(e.target);
//     e.preventDefault();

// })

//stuck on editing
