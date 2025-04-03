var Links = {
    setColor:function (color) {
        var alist = document.querySelectorAll('a');
        var i = 0;
        while(i < alist.length) {
            alist[i].style.color = color;
            i = i + 1;
        }
    }
}
var Body = {
    setColor:function (color) {
        document.querySelector('body').style.color = color;
    },
    setBackgroundColor:function (color) {
        document.querySelector('body').style.backgroundColor = color;
    }
}
function nightDayHandler(self) {
    var body = document.querySelector('body');

    if (self.value === 'night') {
        body.classList.add("night-mode");
        Body.setBackgroundColor('black');
        Body.setColor('green'); // ✅ 모든 글씨 초록색으로 변경
        self.value = 'day';
        Links.setColor('green'); // ✅ 링크 색상도 초록색으로 변경
        localStorage.setItem("nightMode", "night"); // ✅ 야간 모드 저장
    } else {
        body.classList.remove("night-mode");
        Body.setBackgroundColor('white');
        Body.setColor('black');
        self.value = 'night';
        Links.setColor('black');
        localStorage.setItem("nightMode", "day"); // ✅ 주간 모드 저장
    }
}

// ✅ 페이지가 로드될 때 야간 모드 상태 확인 후 적용
document.addEventListener("DOMContentLoaded", function () {
    var nightDayButton = document.getElementById("night_day");

    if (!nightDayButton) {
        console.error("❌ 'night_day' 버튼을 찾을 수 없음! HTML에서 확인 필요!");
        return;
    }

    var savedMode = localStorage.getItem("nightMode");

    // ✅ 저장된 모드가 "night"이면 야간 모드로 변경
    if (savedMode === "night") {
        document.body.classList.add("night-mode");
        Body.setBackgroundColor('black');
        Body.setColor('green');
        Links.setColor('green');
        nightDayButton.value = "day"; // 버튼 값 변경
    } else {
        document.body.classList.remove("night-mode");
        Body.setBackgroundColor('white');
        Body.setColor('black');
        Links.setColor('black');
        nightDayButton.value = "night";
    }
});