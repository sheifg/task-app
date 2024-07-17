// This file is for creating classes

let data = [];

// Task to handle the data inside and methods
export class Task{
    constructor(title){
        this.title = title;
        // Show when this task is created
        this.date = new Date();
        // It is good to have each task an id, so using Date.now(giving you the time in miliseconds) to differenece from date
        this.id = Date.now();
        // The task always starts as incompleted
        this.completed = false
        
    }

    // Method or function of the class Task
    // It will be used this inside of instance, therefore static cannot be writtten. Static is used to make method only for class not for instance of it. So if you want to reach class method directly, you should use static. If you want to reach instance method, you should not use static.

    addTask(){
        data.push(this);
    }
    // It is using id, because you want delete just one
    // Instead of deleting, it will be used filter in case you want to recover this info later on
    // So it is not being deleted directly
    // It is being removed from the array but it is saving in the database
    static deleteTaskById(id){
        data = data.filter(task => task.id != id)
    }

    static toggleComplete(id) {               // task.id:from classes   id:parameter 
        const taskIndex =  data.findIndex( task => task.id == id);
        // If the task is clicked as completed, the value in the task of completed change from false to true
        data[taskIndex].completed = !data[taskIndex].completed;
    }
}

// This class includes methods to serve UI parts so it is not necessary properties, which means it won't be necesary constructor()
// This methods will work without any external parameters for that reasons there are no parameters
export class Ui{
    static showAddCard(){
        const overlay =  document.getElementById("overlay");
        overlay.classList.add("show");
        overlay.classList.remove("hide");
    }

    static hideAddCard(){
        const overlay =  document.getElementById("overlay");
        overlay.classList.remove("show");
        overlay.classList.add("hide");
    }
    // This render method will render the tasks in the UI and will update statistics part
    static render(){
        const tasks = document.getElementById("tasks");
        tasks.innerHTML = "<h2> Your Tasks</h2>";
                                    // Select the 3 child of card inside the stats and change the <p>
        document.querySelector("#stats .card:nth-child(3) p").textContent = data.length;
        document.querySelector("#stats .card:nth-child(1) p").textContent = data.filter(task => task.completed === true).length;
        document.querySelector("#stats .card:nth-child(2) p").textContent = data.filter(task => task.completed === false).length;
        
        // Getting the number of tasks, it can be rendered them
        // For each tasks inside the data, it will create a div to show the task
        data.forEach(task => {
            const div = document.createElement('div');
            div.classList.add('task')
            if(task.completed) div.style.background = 'lightgreen';
            else{
                div.style.background = "white"
            }
            // It is being creted id for each div so later on it can be used id of div to delete or toggle etc.
            div.id = `task-${task.id}`;
            // Now it is being created task itself
            div.innerHTML = `
             <input type="checkbox" class="check" />
             <div class="task-details">
                <h3 class="task-title">${task.title}</h3>
                <small> ${task.date}</small>
             </div>
             <div class="actions">
                <button><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash" ></i></button>
             </div>
            `
            tasks.appendChild(div);
    })
}}