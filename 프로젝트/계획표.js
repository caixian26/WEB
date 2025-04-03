document.addEventListener("DOMContentLoaded", function () {
    const datePicker = document.getElementById("date-picker");
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const completedList = document.getElementById("completed-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};

    function renderTasks() {
        taskList.innerHTML = "";
        completedList.innerHTML = "";

        Object.keys(tasks).forEach((date) => {
            tasks[date].forEach((task, index) => {
                let li = createTaskElement(date, task, index, false);
                taskList.appendChild(li);
            });
        });

        Object.keys(completedTasks).forEach((date) => {
            completedTasks[date].forEach((task, index) => {
                let li = createTaskElement(date, task, index, true);
                completedList.appendChild(li);
            });
        });
    }

    function createTaskElement(date, task, index, isCompleted) {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${date}</strong> - ${task}`;

        let completeButton = document.createElement("button");
        completeButton.textContent = isCompleted ? "✔" : "완료";
        completeButton.classList.add("complete-btn");
        completeButton.addEventListener("click", () => toggleComplete(date, index, isCompleted));

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => deleteTask(date, index, isCompleted));

        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        if (isCompleted) {
            li.classList.add("completed");
        }

        return li;
    }

    function toggleComplete(date, index, isCompleted) {
        if (isCompleted) {
            if (!tasks[date]) tasks[date] = [];
            tasks[date].push(completedTasks[date][index]);
            completedTasks[date].splice(index, 1);
        } else {
            if (!completedTasks[date]) completedTasks[date] = [];
            completedTasks[date].push(tasks[date][index]);
            tasks[date].splice(index, 1);
        }
        saveTasks();
        renderTasks();
    }

    function deleteTask(date, index, isCompleted) {
        if (isCompleted) {
            completedTasks[date].splice(index, 1);
        } else {
            tasks[date].splice(index, 1);
        }
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
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

    renderTasks();
});