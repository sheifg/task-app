// This file will handle DOM Manipulation
import {Task, Ui} from "./lib.js"

// This is add button from navigation where will open add task panel
const addBtn = document.querySelector("nav button");
// This is cancel button from add task panel where will close the panel
const cancelBtn = document.querySelector('#overlay button[type="reset"]');

// Event listener to open and close panel
addBtn.addEventListener("click", Ui.showAddCard);
cancelBtn.addEventListener("click", Ui.hideAddCard);


// Adding a task                                        // It is not possible to add directly Task.addTask
document.querySelector("form").addEventListener("submit", addTaskFromForm);

// Toggle complete button event handlers
document.addEventListener('change',event => {
    if(event.target.className.includes('check')){

        // Getting id of the task that will be toggled
        const id = event.target.parentElement.id.split('-')[1];
        event.target.checked = true;
        Task.toggleComplete(id);
        Ui.render();
    }
})

// Delete button event handlers
document.addEventListener("click", event => {
    if(event.target.className.includes("delete-btn")){
        // Getting id of the task to be delete, it is necessary to access to the task.id spliting
        const id = event.target.parentElement.parentElement.id.split('-')[1];
    
        // Deleting the task from data
        Task.deleteTaskById(id);
        // Re-rendering the tasks in the UI after deleting a task
        Ui.render();
    }
})

function addTaskFromForm(event) {
    event.preventDefault();
    // To get input for adding task (from html)
    const taskInput = document.querySelector("#addCard input");
    // Creating instance of Task class (from lib.js)
    // Now it is being created the task from class Task. Task needs a title that it is inputTask value
    const task = new Task(taskInput.value);
    // Adding task to data which it was created from Task class
    task.addTask();
    taskInput.value = ""
    // It is not being generated something from ui, just use the method render for ui, for that reason it is being used static in render
    // Closing panel after adding task
    Ui.hideAddCard();
    // Re-rendering the tasks in the UI after adding a new task
    Ui.render();

}

// This will render the task in the UI when page opens
Ui.render();