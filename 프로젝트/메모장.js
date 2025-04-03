document.addEventListener("DOMContentLoaded", function () {
    const memoArea = document.getElementById("memo-area");
    const saveTxtBtn = document.getElementById("save-txt");
    const saveAsTxtBtn = document.getElementById("save-as-txt"); // 새로운 버튼

    // ✅ 1️⃣ 메모 자동 저장 (localStorage 활용)
    memoArea.value = localStorage.getItem("memo") || "";
    memoArea.addEventListener("input", () => {
        localStorage.setItem("memo", memoArea.value);
    });

    // ✅ 2️⃣ TXT 파일 저장 기능
    function saveMemoFile(filename) {
        let text = memoArea.value.trim();
        if (text === "") {
            alert("저장할 메모가 없습니다!");
            return;
        }
        let blob = new Blob([text], { type: "text/plain" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // ✅ 3️⃣ 기본 저장 (메모.txt)
    saveTxtBtn.addEventListener("click", () => {
        saveMemoFile("메모.txt");
    });

    // ✅ 4️⃣ "다른 이름으로 저장" 버튼 기능
    saveAsTxtBtn.addEventListener("click", () => {
        let newFileName = prompt("저장할 파일 이름을 입력하세요 (확장자는 자동으로 .txt로 저장됩니다):", "새로운메모");
        if (newFileName) {
            saveMemoFile(newFileName + ".txt");
        }
    });
});