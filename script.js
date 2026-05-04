let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((taskObj, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = taskObj.text;

        if (taskObj.completed) {
            span.style.textDecoration = "line-through";
        }

        let completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value;

    if (text === "") return;

    tasks.push({ text: text, completed: false });
    saveTasks();
    renderTasks();

    input.value = "";
}

renderTasks();
