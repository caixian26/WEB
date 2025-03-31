document.addEventListener("DOMContentLoaded", function () {
    const scheduleBody = document.getElementById("schedule-body");
    const addRowButton = document.getElementById("add-row");

    let scheduleData = JSON.parse(localStorage.getItem("schedule")) || [];

    function renderSchedule() {
        scheduleBody.innerHTML = "";
        scheduleData.forEach((row, rowIndex) => {
            let tr = document.createElement("tr");

            let timeCell = document.createElement("td");
            let timeInput = document.createElement("input");
            timeInput.type = "text";
            timeInput.value = row.time;
            timeInput.addEventListener("input", () => {
                scheduleData[rowIndex].time = timeInput.value;
                saveSchedule();
            });
            timeCell.appendChild(timeInput);
            tr.appendChild(timeCell);

            // 💡 기존 5개(월~금) -> 7개(월~일) 확장
            for (let i = 0; i < 7; i++) {
                let cell = document.createElement("td");
                let input = document.createElement("input");
                input.type = "text";
                input.value = row.subjects[i] || "";
                input.addEventListener("input", () => {
                    scheduleData[rowIndex].subjects[i] = input.value;
                    saveSchedule();
                });
                cell.appendChild(input);
                tr.appendChild(cell);
            }

            let deleteCell = document.createElement("td");
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "❌";
            deleteButton.addEventListener("click", () => {
                scheduleData.splice(rowIndex, 1);
                saveSchedule();
                renderSchedule();
            });
            deleteCell.appendChild(deleteButton);
            tr.appendChild(deleteCell);

            scheduleBody.appendChild(tr);
        });
    }

    function saveSchedule() {
        localStorage.setItem("schedule", JSON.stringify(scheduleData));
    }

    addRowButton.addEventListener("click", () => {
        scheduleData.push({ time: "", subjects: ["", "", "", "", "", "", ""] });
        saveSchedule();
        renderSchedule();
    });

    renderSchedule();
});