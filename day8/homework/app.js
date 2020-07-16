// make a class for the task so that every time you make a new task it does this
class Task {
    constructor(id, title, priority, sortKey = 1) {
        this.id = id;
        this.title= title;
        this.sortKey= sortKey;
        this.priority = priority;
        //each task added now automatically has an id, a title, a sortkey
    }
}


class TaskListPage {
    constructor() {
        this.tasks=[];
        //creates an empty array of tasks
        firebase.database().ref("tasks")
        .once("value", (snapshot) => {
            //once is like an even listener, so when there is data there, do this function
            const allTasks = snapshot.val();
            //snapshot returns all the data, so use .val() to get the stuff we want, allTasks is an object
            Object.keys(allTasks).forEach((taskId)=> {
                //Object.keys makes an array of the keys from an object, you specify which object in the brackets, so makes an array of the names (not the value) from the allTasks [which is the snapshot.val() ] object
                //The forEach() method calls a function once for each element in an array, in order --> so will do this function to each of the keys in the object
                //arrow function so taskId is the parameter
                const taskData = allTasks[taskId];
                //getting a constant from the object
                const task = new Task(taskId, taskData.title, taskData.priority);
                // using the Task class and making a new constant called task
                console.log(task);
                this.tasks.push(task);
                //adding this task to the array tasks

                const taskListElement = document.getElementById("taskList");
                //id is to the tbody
                const row = document.createElement("tr");
                row.setAttribute("data-task-id", task.id);
                console.log(row);
                //data-task-id is the name of the attribute whose value is to be set (we might just be creating the attribute and then assigning it --> can now access data-action and data-task-id because it's been added to object), task.id is the value assigned to it --> task is an object and has id in it
                row.innerHTML = `
                <td>${task.title}</td>
                <td>
                <button data-action="edit" data-task-id= "${task.id}" class="btn btn-primary">Edit</button>
                <button data-action="delete" data-task-id="${task.id}" class="btn btn-danger">Delete</button>
                <button data-action="priority" data-task-id="${task.id}" class="btn btn-secondary">Priority</button>
                </td>
                `;
                if (taskData.priority) {
                    if (taskData.priority.priority == "high") {
                        row.style.backgroundColor = "red";
                    } else if (taskData.priority.priority == "medium") {
                        row.className="bg-warning";
                    } else if (taskData.priority.priority == "low") {
                        row.className="bg-success";
                    }
                } else {
                    row.className="bg-light";
                }

                //creates a row and assigns the td within it a data-action and a data-task-id. the data-task-id is the task.id
                taskListElement.appendChild(row);
            });   
        });
    }
    //end of the constructor function --> 



    addTask(title) {
        //const taskI = this.tasks.length +1;
        const sortKey = this.tasks.length + 1;
        // add 1 to the sort key
        const newTaskSnapshot = firebase.database().ref("tasks").push({
            title: title,
            sortKey: sortKey,
            priority: ""
            // i think we're setting the title to title which is a parameter of addTask
        });
        //end of push to firebase
        const taskId = newTaskSnapshot.key;
        const priority = "";

        const task = new Task(taskId, title, priority, sortKey);
        this.tasks.push(task);
        //adding this instance of the task to the tasks array

        const taskListElement = document.getElementById("taskList");
        //id is tbody
      const row = document.createElement("tr");
      row.setAttribute("data-task-id", task.id);
      //copypaste
      row.innerHTML = `
        <td>${task.title}</td>
        <td>
          <button data-action="edit" data-task-id="${task.id}" class="btn btn-primary">Edit</button>
          <button data-action="delete" data-task-id="${task.id}" class="btn btn-danger">Delete</button>
          <button data-action="priority" data-task-id="${task.id}" class="btn btn-secondary">Priority</button>
        </td>
      `;
      taskListElement.appendChild(row);
      //this whole block is the same as from constructor func

      document.getElementById("inputTask").value="";
      //makes the input box empty again
    }
    //end of add text method

    startEdittingTask(taskId) {
        for (let k=0; k < this.tasks.length; k++) {
            //for loop runs through the length of tasks, could you use forEach here?
            if (this.tasks[k].id == taskId) {
                // the for loop goes through each task in the Array. "if" checks if it equals taskId, if it does, then this next bit executes
                const task = this.tasks[k];
                //created a constant from that particular number in the tasks array

                const taskInputElement = document.getElementById("inputTask");
                //the input box
                taskInputElement.value = task.title;
                // sets the value of the input box to the title of the task
                taskInputElement.setAttribute("data-task-id", task.id);
                // also was sehr ähnliches früher
                document.getElementById("addBtn").innerText = "Save";
            }
        }
    }
    //end of start editing task func
    
    saveTaskTitle(taskId, taskTitle) {
        const task = this.tasks.find((task) => task.id == taskId);
        //not sure about syntax here
        if (!task) return;
        task.title = taskTitle;

        firebase.database().ref("tasks").child(taskId).set(task);
        //same as tasks/someTaskId then setting it to task 

        const existingRow = document.querySelector(`tr[data-task-id="${task.id}"]`);
        //finds that row using the id of the particular task
        if (!existingRow) return;
        //not sure why you need this

        existingRow.children[0].innerHTML = task.title;
        // the first child of the exisitng row (the bit with the take) change it to the task.title
        const taskInput = document.getElementById("inputTask");
        taskInput.removeAttribute("data-task-id");
        //why are we removing the attribute?
        taskInput.value ="";
        document.getElementById("addBtn").innerText = "Add";
        //changing btn appearance back to add from save
    }

    delete(taskId) {
        const task = this.tasks.find((task) => task.id == taskId);
        if (!task) return;
        firebase.database().ref("tasks").child(taskId).remove();
        // removes from firebase

        const existingRow = document.querySelector(`tr[data-task-id="${task.id}"]`);
        //finds the existing row in the html
        if (!existingRow) return;
        existingRow.remove();
     }

     changePriority(taskId) {
        for (let k=0; k < this.tasks.length; k++) {
            //for loop runs through the length of tasks, could you use forEach here?
            if (this.tasks[k].id == taskId) {
                const task = this.tasks[k];
                

                const inputPriorityElement = document.getElementById("inputPriority");
                const inputPriorityBtn = document.getElementById("inputPriorityBtn");
                const priorityDiv = document.getElementById("priorityDiv");
                priorityDiv.className="d-box";
                
                //make a function for all this repeated code
                inputPriorityBtn.addEventListener("click", (e)=>{
                    const priorityValue = inputPriorityElement.value;

                    if (priorityValue == "low" ) {
                        firebase.database().ref("tasks").child(taskId).child("priority").set({
                            priority : priorityValue
                        });
                        priorityDiv.className="d-none";
                    } else if (priorityValue == "medium") {
                        firebase.database().ref("tasks").child(taskId).child("priority").set({
                            priority : priorityValue
                        });
                        priorityDiv.className="d-none";

                    } else if (priorityValue == "high") {
                        firebase.database().ref("tasks").child(taskId).child("priority").set({
                            priority : priorityValue
                        });
                        priorityDiv.className="d-none";
                    } else {
                        alert("Please enter high, medium, or low");
                    }

                })
            
            }}

     }
}
// end of taskList page

const taskListPage = new TaskListPage();
//creates a taskListPageObject --> has all those methods

const priorityDiv = document.getElementById("priorityDiv");
priorityDiv.className="d-none";

document.getElementById("addBtn").addEventListener("click", (e) => {
    //when addBtn clicked, do this
    const taskInputElement = document.getElementById("inputTask");
    const taskTitle = taskInputElement.value;

    const existingTaskId = taskInputElement.getAttribute("data-task-id");
    if (existingTaskId) {
        // not sure about this syntax -- existingTaskId must be a true value but why? - is it because the attribute exists
        taskListPage.saveTaskTitle(existingTaskId, taskTitle);
        //accessing the saveTaskTitle method
    } else {
        taskListPage.addTask(taskTitle);
    }
});
// end of add button event listener

document.getElementById("taskList").addEventListener("click", (e) => {
    // task list is tbody, if it's clicked then do this
    const action = e.target.getAttribute("data-action");
    // e.target is what triggered the event listener
    const taskId = e.target.getAttribute("data-task-id");
    // every button in the row given the right task id

    if (action =="edit") {
        taskListPage.startEdittingTask(taskId);
    } else if (action == "delete") {
        taskListPage.delete(taskId);
    } else if (action == "priority") {
        taskListPage.changePriority(taskId);
    }
});



