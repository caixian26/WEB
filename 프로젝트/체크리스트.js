document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("checklist")) || [];

    function renderTasks() {
        taskList.innerHTML = ""; // 기존 리스트 초기화
        tasks.forEach((task, index) => {
            let li = document.createElement("li");

            // ✅ iOS 스타일 체크박스 생성
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("ios-toggle"); // 스타일 적용!
            checkbox.setAttribute("data-style", "ios"); // 강제 적용 (추가)
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                tasks[index].completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            let text = document.createElement("span");
            text.textContent = task.text;
            if (task.completed) {
                text.style.textDecoration = "line-through";
                text.style.color = "gray";
            }

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "❌";
            deleteButton.classList.add("delete-btn");
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            // ✅ HTML 구조를 올바르게 정리
            li.appendChild(checkbox); // 체크박스 추가
            li.appendChild(text);
            li.appendChild(deleteButton);
            taskList.appendChild(li); // 리스트에 추가
        });
    }

    function saveTasks() {
        localStorage.setItem("checklist", JSON.stringify(tasks));
    }

    addTaskButton.addEventListener("click", () => {
        let taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = "";
        } else {
            alert("할 일을 입력해주세요!");
        }
    });

    renderTasks(); // 페이지 로딩 시 기존 할 일 불러오기
});