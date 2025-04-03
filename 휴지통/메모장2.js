document.addEventListener("DOMContentLoaded", function () {
    const memoArea = document.getElementById("memo-area");
    const saveTxtBtn = document.getElementById("save-txt");
    const saveAsTxtBtn = document.getElementById("save-as-txt"); // 새로운 버튼

    // ✅ 1️⃣ 메모 자동 저장 (localStorage 활용)
    memoArea.value = localStorage.getItem("memo") || "";
    memoArea.addEventListener("input", () => {
        localStorage.setItem("memo", memoArea.value);
    });

    // ✅ 2️⃣ TXT 파일 저장 (사용자가 직접 폴더 선택 가능)
    async function saveAsTxtFile() {
        try {
            // ✅ 파일 저장 대화상자 열기
            const handle = await window.showSaveFilePicker({
                suggestedName: "새로운메모.txt",
                types: [
                    {
                        description: "텍스트 파일",
                        accept: { "text/plain": [".txt"] },
                    },
                ],
            });

            // ✅ 사용자가 선택한 파일에 내용 저장
            const writable = await handle.createWritable();
            await writable.write(memoArea.value);
            await writable.close();
            alert("파일이 성공적으로 저장되었습니다!");
        } catch (error) {
            console.error("파일 저장 오류:", error);
            alert("파일 저장을 취소하셨거나 오류가 발생했습니다.");
        }
    }

    // ✅ 3️⃣ "다른 이름으로 저장" 버튼 기능
    saveAsTxtBtn.addEventListener("click", saveAsTxtFile);
});