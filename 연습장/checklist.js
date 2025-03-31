function addTask() {
    let taskInput = document.getElementById("new-task");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let taskList = document.getElementById("task-list");
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    
    let label = document.createElement("label");
    label.textContent = taskText;

    li.appendChild(checkbox);
    li.appendChild(label);
    taskList.appendChild(li);

    taskInput.value = "";
}