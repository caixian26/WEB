document.addEventListener("DOMContentLoaded", function () {
    const datePicker = document.getElementById("date-picker");
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

    function renderTasks() {
        let selectedDate = datePicker.value;
        taskList.innerHTML = "";
        if (tasks[selectedDate]) {
            tasks[selectedDate].forEach((task, index) => {
                let li = document.createElement("li");
                li.textContent = task;

                let deleteButton = document.createElement("button");
                deleteButton.textContent = "❌";
                deleteButton.addEventListener("click", () => {
                    tasks[selectedDate].splice(index, 1);
                    saveTasks();
                    renderTasks();
                });

                li.appendChild(deleteButton);
                taskList.appendChild(li);
            });
        }
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskButton.addEventListener("click", () => {
        let selectedDate = datePicker.value;
        let taskText = taskInput.value.trim();

        if (!selectedDate || !taskText) {
            alert("날짜와 할 일을 입력하세요!");
            return;
        }

        if (!tasks[selectedDate]) {
            tasks[selectedDate] = [];
        }

        tasks[selectedDate].push(taskText);
        saveTasks();
        renderTasks();
        taskInput.value = "";
    });

    datePicker.addEventListener("change", renderTasks);
});