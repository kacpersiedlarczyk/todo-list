const tasksContainer = document.querySelector(".tasks");
const newTaskForm = document.querySelector(".new-task-form");
const newTaskInput = document.querySelector(".new-task-input");

let tasks = [
    {
        id: "1",
        title: "Sleep",
        completed: false
    },
    {
        id: "2",
        title: "Homework",
        completed: false
    },
    {
        id: "3",
        title: "Dinner",
        completed: false
    }
];

newTaskForm.addEventListener("submit", event => {
    event.preventDefault();

    const taskName = newTaskInput.value;

    if (taskName === "" || taskName === null) {
        return;
    };
    
    
    
    
    const newTask = new Task(Date.now().toString(), taskName, false);
    
    
    
    
    
    
    newTaskInput.value = null;
    tasks.push(newTask);
    render();
});


// onw module
class Task {
    constructor(id, title, completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    };
};



    

// own module
// render tasks
function render() {
    clearElement(tasksContainer);

    if (tasks.length === 0) {
        tasksContainer.innerHTML = "<h1>Add a new task!</h1>"
    };

    tasks.forEach(task => {
        tasksContainer.innerHTML += `
            <div class="task">
                <div class="task-input">
                    <input id="${task.id}" type="checkbox" ${task.completed ? "checked" : ""}>
                    <label class=${task.completed ? "completed" : ""} for="${task.id}">${task.title}</label>
                </div>

                <button class="btn delete" data-id=${task.id}></button>
            </div>
        `;
    }); 
};




// own module
// make elelemnt empty
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

render();





// own module
// mark tasks as completed
tasksContainer.addEventListener("click", event => {
    if (event.target.tagName.toLowerCase() !== "input") {
        return;
    };

    const label = event.target.nextElementSibling;

    for (let i = 0; i < tasks.length; i++) {
        if (event.target.id === tasks[i].id) {
            tasks[i].completed = !tasks[i].completed;
            
            label.classList.toggle("completed");
        };
    };
});

// own module
// delete tasks
tasksContainer.addEventListener("click", event => {
    if (event.target.tagName.toLowerCase() !== "button") {
        return;
    };

    for (let i = 0; i < tasks.length; i++) {
        if (event.target.dataset.id === tasks[i].id) {
            tasks.splice(i,1);
            event.target.remove();
        };
    }

    render()
});









// tasksContainer.addEventListener("click", event => {
//     if (event.target.tagName.toLowerCase() === "input") {
//         complete()
//     };

//     if (event.target.tagName.toLowerCase() === "button") {
//         delete();
//     };
// });















// function renderTasks(tasksList) {
//     const tasksContainer = document.querySelector(".tasks");

//     clearElement(tasksContainer);

//     // if (tasks.length === 0) {
//     //     tasksContainer.innerHTML = "<h1>Add a new book!</h1>"
//     // };

//     tasksList.forEach(task => {
//         tasksContainer.innerHTML += `
//             <div class="task">
//                 <div class="task-input">
//                     <input id="${task.id}" type="checkbox">
//                     <label for="${task.id}">${task.title}</label>
//                 </div>

//                 <button class="btn delete">
//                     <img src="./assets/icon-cross.svg" alt="">
//                 </button>
//             </div>
//         `;
//     }); 
// };