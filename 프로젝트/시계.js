function updateClock() {
    var date = new Date();
    var year = date.getFullYear().toString();

    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    var day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    var hour = date.getHours();
    hour = hour < 10 ? '0' + hour.toString() : hour.toString();

    var min = date.getMinutes();
    min = min < 10 ? '0' + min.toString() : min.toString();

    var sec = date.getSeconds();
    sec = sec < 10 ? '0' + sec.toString() : sec.toString();

    var now = `${year}년 ${month}월 ${day}일 ${hour}시 ${min}분 ${sec}초`;

    document.getElementById("clock").innerText = now;
}
setInterval(updateClock, 1000);
document.addEventListener("DOMContentLoaded", updateClock);