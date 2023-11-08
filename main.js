const tasksContainer = document.querySelector(".tasks");
const newTaskForm = document.querySelector(".new-task-form");
const newTaskInput = document.querySelector(".new-task-input");
const filters = document.querySelectorAll(".filter");
const clearButton = document.querySelector(".clear");

let tasks = [
    {
        id: "1",
        title: "Exercise",
        completed: false,
    },
    {
        id: "2",
        title: "Homework",
        completed: false,
    },
    {
        id: "3",
        title: "Dinner",
        completed: false,
    },
];

newTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = newTaskInput.value;

    if (taskName === "" || taskName === null) return;

    const newTask = new Task(Date.now().toString(), taskName, false);

    newTaskInput.value = null;
    tasks.push(newTask);
    render(tasks);
});

tasksContainer.addEventListener("click", (event) => {
    const targetTagName = event.target.tagName.toLowerCase();

    if (targetTagName === "input") {
        completeTask(event.target);
    }

    if (targetTagName === "button") {
        deleteTask(event.target);
        render(tasks);
    }
});

filters.forEach((filter) => {
    filter.addEventListener("click", (event) => {
        removeActiveClass(filters);
        event.target.classList.add("active");

        if (event.target.innerHTML === "Completed") {
            const completed = getCompleted(tasks);
            render(completed);
        }

        if (event.target.innerHTML === "Active") {
            const active = getActive(tasks);
            render(active);
        }

        if (event.target.innerHTML === "All") {
            render(tasks);
        }
    });
});

clearButton.addEventListener("click", (event) => {
    clearCompleted(tasks);
    render(tasks);
});

render(tasks);

class Task {
    constructor(id, title, completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function completeTask(task) {
    const label = task.nextElementSibling;
    label.classList.toggle("completed");

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === task.id) {
            tasks[i].completed = !tasks[i].completed;
        }
    }
}

function deleteTask(task) {
    for (let i = 0; i < tasks.length; i++) {
        if (task.dataset.id === tasks[i].id) {
            tasks.splice(i, 1);
            task.remove();
        }
    }
}

function getActive(list) {
    return list.filter((task) => !task.completed);
}

function getCompleted(list) {
    return list.filter((task) => task.completed);
}

function clearCompleted(list) {
    const active = getActive(list);
    tasks = active;
}

function removeActiveClass(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove("active");
    }
}

function render(list) {
    const tasksContainer = document.querySelector(".tasks");

    clearElement(tasksContainer);

    list.forEach((task) => {
        tasksContainer.innerHTML += `
            <div class="task">
                <div class="task-input">
                    <input 
                        id="${task.id}"
                        type="checkbox" 
                        ${task.completed ? "checked" : ""}
                    >
                    <label
                        class=${task.completed ? "completed" : ""}
                        for="${task.id}"
                    >${task.title}</label>
                </div>

                <button class="btn delete" data-id=${task.id}></button>
            </div>
        `;
    });
}
