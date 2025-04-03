document.addEventListener("DOMContentLoaded", function () {
    const scheduleBody = document.getElementById("schedule-body");
    const generateButton = document.getElementById("generate-schedule");
    const fixButton = document.getElementById("fix-schedule");

    let scheduleData = JSON.parse(localStorage.getItem("schedule")) || [];
    let isFixed = JSON.parse(localStorage.getItem("isFixed")) || false;

    function renderSchedule() {
        scheduleBody.innerHTML = "";

        scheduleData.forEach((row, rowIndex) => {
            let tr = document.createElement("tr");

            let timeCell = document.createElement("td");
            timeCell.textContent = row.time;
            tr.appendChild(timeCell);

            for (let i = 0; i < 7; i++) {
                let cell = document.createElement("td");

                let input = document.createElement("input");
                input.type = "text";
                input.value = row.subjects[i] || "";
                input.addEventListener("input", () => {
                    row.subjects[i] = input.value;
                    saveSchedule();
                });

                if (isFixed) input.setAttribute("disabled", "true");

                cell.appendChild(input);
                tr.appendChild(cell);
            }

            scheduleBody.appendChild(tr);
        });

        if (isFixed) mergeCells();
    }

    function saveSchedule() {
        localStorage.setItem("schedule", JSON.stringify(scheduleData));
    }

    function generateSchedule() {
        const sleepStart = document.getElementById("sleep-start").value;
        const sleepEnd = document.getElementById("sleep-end").value;

        const startHour = parseInt(sleepEnd.split(":")[0]); // 기상 시간
        const endHour = parseInt(sleepStart.split(":")[0]); // 취침 시간

        scheduleData = [];

        for (let hour = startHour; hour < endHour; hour++) {
            scheduleData.push({
                time: `${hour}:00`,
                subjects: ["", "", "", "", "", "", ""],
            });
        }

        saveSchedule();
        renderSchedule();
    }

    function toggleFixSchedule() {
        isFixed = !isFixed;
        localStorage.setItem("isFixed", JSON.stringify(isFixed));

        if (isFixed) {
            fixSchedule();
        } else {
            unfixSchedule();
        }
    }

    function fixSchedule() {
        const inputs = document.querySelectorAll("#schedule-body input");
        inputs.forEach((input) => input.setAttribute("disabled", "true"));

        mergeCells();
        updateFixButton();
    }

    function unfixSchedule() {
        isFixed = false;
        localStorage.setItem("isFixed", JSON.stringify(isFixed));
        renderSchedule();
        updateFixButton();
    }

    function mergeCells() {
        const rows = scheduleBody.rows;
        for (let col = 1; col <= 7; col++) {
            let prevCell = null;
            let spanCount = 1;

            for (let row = 0; row < rows.length; row++) {
                let cell = rows[row].cells[col];

                if (
                    prevCell &&
                    prevCell.firstChild.value === cell.firstChild.value &&
                    cell.firstChild.value !== ""
                ) {
                    spanCount++;
                    prevCell.rowSpan = spanCount;
                    cell.style.display = "none"; // 셀 숨기기
                } else {
                    prevCell = cell;
                    spanCount = 1;
                }
            }
        }
    }

    function updateFixButton() {
        fixButton.textContent = isFixed ? "시간표 고정됨 ✅ (클릭하면 해제)" : "시간표 고정";
        fixButton.style.backgroundColor = isFixed ? "gray" : "#4CAF50";
    }

    generateButton.addEventListener("click", generateSchedule);
    fixButton.addEventListener("click", toggleFixSchedule);

    updateFixButton();
    renderSchedule();
});