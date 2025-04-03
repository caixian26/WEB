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
        let memoText = document.getElementById("stopwatch-memo").value;
        let li = document.createElement("li");

        if (memoText) {
            li.textContent = `${stopwatchDisplay.textContent} - ${memoText}`;
        } else {
            li.textContent = stopwatchDisplay.textContent;
        }

        recordList.appendChild(li);
        document.getElementById("stopwatch-memo").value = ""; // 입력칸 초기화
    });

    // ✅ 타이머 기능
    let timerInterval, timerTime = 0;
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
        timerTime = 0; // ✅ timerTime 초기화 추가!
        timerDisplay.textContent = "00:00";
        timerInput.value = "";
        timerMemo.value = "";
    });

    // ✅ 포커스 모드 기능 (PiP 지원)
    document.addEventListener("DOMContentLoaded", function () {
        const focusModeBtn = document.getElementById("focus-mode-btn");
        const focusContainer = document.getElementById("focus-video-container");
        const focusVideo = document.getElementById("focus-video");
        const exitFocusBtn = document.getElementById("exit-focus");
    
        // ✅ 콘솔 로그로 동작 확인 (테스트용)
        console.log("포커스 모드 JS 로드 완료!");
    
        // ✅ 버튼 클릭 시 동작
        focusModeBtn.addEventListener("click", function () {
            console.log("포커스 모드 버튼 클릭됨!"); // 로그 확인
            if (focusContainer.style.display === "none" || focusContainer.style.display === "") {
                focusContainer.style.display = "block"; // 📌 영상 보이기
                focusVideo.play(); // 자동 재생
                console.log("포커스 모드 ON");
            } else {
                focusContainer.style.display = "none"; // 📌 영상 숨기기
                focusVideo.pause(); // 영상 일시정지
                console.log("포커스 모드 OFF");
            }
        });
    
        // 📌 종료 버튼 클릭 시 영상 숨김
        exitFocusBtn.addEventListener("click", function () {
            focusContainer.style.display = "none";
            focusVideo.pause();
            console.log("포커스 모드 종료");
        });
    });
});