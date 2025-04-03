document.addEventListener("DOMContentLoaded", function () {
    let isFocusMode = false;

    // ✅ 스탑워치 기능
    let stopwatchTime = 0, stopwatchInterval;
    const stopwatchDisplay = document.getElementById("stopwatch-display");
    const startStopwatch = document.getElementById("start-stopwatch");
    const pauseStopwatch = document.getElementById("pause-stopwatch");
    const resetStopwatch = document.getElementById("reset-stopwatch");
    const saveRecord = document.getElementById("save-record");
    const recordList = document.getElementById("record-list");

    function updateStopwatchDisplay() {
        let hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, "0");
        let minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, "0");
        let seconds = String(stopwatchTime % 60).padStart(2, "0");
        stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    startStopwatch.addEventListener("click", function () {
        if (!stopwatchInterval) {
            stopwatchInterval = setInterval(() => {
                stopwatchTime++;
                updateStopwatchDisplay();
            }, 1000);
        }
    });

    pauseStopwatch.addEventListener("click", function () {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    });

    resetStopwatch.addEventListener("click", function () {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        stopwatchTime = 0;
        updateStopwatchDisplay();
        recordList.innerHTML = "";
    });

    saveRecord.addEventListener("click", function () {
        let li = document.createElement("li");
        li.textContent = stopwatchDisplay.textContent;
        recordList.appendChild(li);
    });

    // ✅ 타이머 기능
    let timerInterval, timerTime;
    const timerInput = document.getElementById("timer-input");
    const timerMemo = document.getElementById("timer-memo");
    const timerDisplay = document.getElementById("timer-display");
    const startTimer = document.getElementById("start-timer");
    const pauseTimer = document.getElementById("pause-timer");
    const resetTimer = document.getElementById("reset-timer");

    function updateTimerDisplay() {
        let minutes = String(Math.floor(timerTime / 60)).padStart(2, "0");
        let seconds = String(timerTime % 60).padStart(2, "0");
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }

    startTimer.addEventListener("click", function () {
        if (!timerInterval) {
            timerTime = Number(timerInput.value) * 60;
            if (timerTime > 0) {
                timerInterval = setInterval(() => {
                    if (timerTime > 0) {
                        timerTime--;
                        updateTimerDisplay();
                    } else {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        alert(`⏰ 타이머 종료! 해야 할 일: ${timerMemo.value}`);
                    }
                }, 1000);
            }
        }
    });

    pauseTimer.addEventListener("click", function () {
        clearInterval(timerInterval);
        timerInterval = null;
    });

    resetTimer.addEventListener("click", function () {
        clearInterval(timerInterval);
        timerInterval = null;
        timerDisplay.textContent = "00:00";
        timerInput.value = "";
        timerMemo.value = "";
    });

    // ✅ 포커스 모드 기능
    const focusModeBtn = document.getElementById("focus-mode-btn");

    focusModeBtn.addEventListener("click", function () {
        if (!isFocusMode) {
            document.body.classList.add("focus-mode-active");
            focusModeBtn.textContent = "포커스 모드 해제 🔓";
        } else {
            document.body.classList.remove("focus-mode-active");
            focusModeBtn.textContent = "포커스 모드 🔒";
        }
        isFocusMode = !isFocusMode;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let isFocusMode = false;

    // ✅ 스탑워치
    let stopwatchTime = 0, stopwatchInterval;
    const stopwatchDisplay = document.getElementById("stopwatch-display");
    const startStopwatch = document.getElementById("start-stopwatch");
    const pauseStopwatch = document.getElementById("pause-stopwatch");
    const resetStopwatch = document.getElementById("reset-stopwatch");
    const saveRecord = document.getElementById("save-record");
    const recordList = document.getElementById("record-list");

    function updateStopwatchDisplay() {
        let hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, "0");
        let minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, "0");
        let seconds = String(stopwatchTime % 60).padStart(2, "0");
        stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    startStopwatch.addEventListener("click", function () {
        if (!stopwatchInterval) {
            stopwatchInterval = setInterval(() => {
                stopwatchTime++;
                updateStopwatchDisplay();
            }, 1000);
        }
    });

    pauseStopwatch.addEventListener("click", function () {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    });

    resetStopwatch.addEventListener("click", function () {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        stopwatchTime = 0;
        updateStopwatchDisplay();
        recordList.innerHTML = "";
    });

    // ✅ 포커스 모드 (영상 재생)
    const focusModeBtn = document.getElementById("focus-mode-btn");
    const focusVideoContainer = document.getElementById("focus-video-container");
    const focusVideo = document.getElementById("focus-video");
    const exitFocusBtn = document.getElementById("exit-focus");

    focusModeBtn.addEventListener("click", function () {
        focusVideoContainer.style.display = "flex";
        focusVideo.play();
    });

    exitFocusBtn.addEventListener("click", function () {
        focusVideoContainer.style.display = "none";
        focusVideo.pause();
    });
});