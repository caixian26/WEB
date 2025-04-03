document.addEventListener("DOMContentLoaded", function () {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    const calendarContainer = document.getElementById("calendar");
    const yearElement = document.getElementById("current-year");
    const monthElement = document.getElementById("current-month");
    const prevMonthButton = document.getElementById("prev-month");
    const nextMonthButton = document.getElementById("next-month");

    const memoModal = document.getElementById("memo-modal");
    const memoDateElement = document.getElementById("memo-date");
    const memoText = document.getElementById("memo-text");
    const saveMemoButton = document.getElementById("save-memo");
    const closeModal = document.querySelector(".close");

    let selectedDate = null;
    let memos = JSON.parse(localStorage.getItem("memos")) || {};

    function updateCalendar() {
        calendarContainer.innerHTML = `
            <div class="day header">일</div>
            <div class="day header">월</div>
            <div class="day header">화</div>
            <div class="day header">수</div>
            <div class="day header">목</div>
            <div class="day header">금</div>
            <div class="day header">토</div>
        `;

        yearElement.textContent = currentYear;
        monthElement.textContent = currentMonth + 1;

        let firstDay = new Date(currentYear, currentMonth, 1).getDay();
        let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            let emptyCell = document.createElement("div");
            emptyCell.classList.add("day");
            calendarContainer.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            let dayCell = document.createElement("div");
            dayCell.classList.add("day");
            dayCell.textContent = i;

            let memoKey = `${currentYear}-${currentMonth + 1}-${i}`;
            if (memos[memoKey]) {
                let memoText = document.createElement("div");
                memoText.classList.add("memo");
                memoText.textContent = memos[memoKey];
                dayCell.appendChild(memoText);
            }

            dayCell.addEventListener("click", function () {
                selectedDate = memoKey;
                memoDateElement.textContent = `${currentYear}년 ${currentMonth + 1}월 ${i}일`;
                memoText.value = memos[memoKey] || "";
                memoModal.style.top = `${event.clientY + 10}px`; // Y 위치 조정 (클릭 위치 아래)
                memoModal.style.left = `${event.clientX}px`; // X 위치 조정
                memoModal.style.display = "block";
            });

            calendarContainer.appendChild(dayCell);
        }
    }

    prevMonthButton.addEventListener("click", function () {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
    });

    nextMonthButton.addEventListener("click", function () {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
    });

    saveMemoButton.addEventListener("click", function () {
        if (selectedDate) {
            let memoContent = memoText.value.trim();
            if (memoContent) {
                memos[selectedDate] = memoContent;
            } else {
                delete memos[selectedDate];
            }
            localStorage.setItem("memos", JSON.stringify(memos));
            memoModal.style.display = "none";
            updateCalendar();
        }
    });

    closeModal.addEventListener("click", function () {
        memoModal.style.display = "none";
    });

    updateCalendar();
});