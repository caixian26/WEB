document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // 캔버스 크기 설정
    canvas.width = 600;
    canvas.height = 300;

    // 게임 상태 변수
    let gameRunning = false;
    let gameOver = false;
    let score = 0;
    let gravity = 0.5;
    let velocityY = 0;
    let velocityX = 3;
    let isJumping = false;
    let obstacles = [];
    let scoreInterval, obstacleInterval;

    // 플레이어 객체
    const player = {
        x: 50,
        y: canvas.height - 50,
        width: 30,
        height: 30,
        color: "white"
    };

    // 장애물 생성 함수
    function createObstacle() {
        if (!gameRunning) return;

        const minGap = 150; // 장애물 간 최소 거리
        const maxGap = 300; // 장애물 간 최대 거리
        const randomGap = Math.floor(Math.random() * (maxGap - minGap) + minGap);
        
        let lastObstacle = obstacles.length > 0 ? obstacles[obstacles.length - 1] : null;
        let newX = lastObstacle ? lastObstacle.x + randomGap : canvas.width;

        obstacles.push({
            x: newX,
            y: canvas.height - 30,
            width: 30,
            height: 30,
            color: "red"
        });
    }

    // 장애물 업데이트 함수
    function updateObstacles() {
        obstacles.forEach(obstacle => {
            obstacle.x -= velocityX;
        });

        // 화면 밖으로 나간 장애물 제거
        obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    }

    // 충돌 감지 함수
    function checkCollision(player, obstacle) {
        return (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        );
    }

    // 점수 업데이트 함수
    function updateScore() {
        if (!gameRunning) return;
        score += 10;
        if (score % 200 === 0) velocityX += 0.5; // 속도 증가
    }

    // 게임 루프
    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 중력 적용
        velocityY += gravity;
        player.y += velocityY;

        // 플레이어 바닥 충돌 처리
        if (player.y >= canvas.height - player.height) {
            player.y = canvas.height - player.height;
            isJumping = false;
        }

        // 장애물 업데이트 및 충돌 체크
        updateObstacles();
        for (let obstacle of obstacles) {
            if (checkCollision(player, obstacle)) {
                endGame();
                return;
            }
        }

        // 플레이어 그리기
        drawObject(player);

        // 장애물 그리기
        obstacles.forEach(drawObject);

        // 점수 표시
        drawScore();

        requestAnimationFrame(gameLoop);
    }

    // 객체 그리기 함수
    function drawObject(obj) {
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    }

    // 점수 그리기 함수
    function drawScore() {
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText("점수: " + score, canvas.width - 80, 20);
    }

    // 점프 함수
    function jump() {
        if (!isJumping && !gameOver) {
            velocityY = -10;
            isJumping = true;
        }
    }

    // 게임 시작 함수
    function startGame() {
        if (gameRunning) return;

        gameRunning = true;
        gameOver = false;
        score = 0;
        obstacles = [];
        velocityY = 0;
        velocityX = 3;

        document.getElementById("scoreDisplay").textContent = "";
        document.getElementById("startButton").style.display = "none";
        document.getElementById("restartButton").style.display = "none";

        clearInterval(scoreInterval);
        clearInterval(obstacleInterval);

        scoreInterval = setInterval(updateScore, 1000);
        obstacleInterval = setInterval(createObstacle, 1500);
        
        createObstacle(); // 첫 장애물 즉시 생성
        gameLoop();
    }

    // 게임 종료 함수
    function endGame() {
        gameOver = true;
        gameRunning = false;
        clearInterval(scoreInterval);
        clearInterval(obstacleInterval);

        document.getElementById("scoreDisplay").textContent = "최종 점수: " + score;
        document.getElementById("restartButton").style.display = "block";
    }

    // 게임 재시작 함수
    function restartGame() {
        gameRunning = false;
        clearInterval(scoreInterval);
        clearInterval(obstacleInterval);
        startGame();
    }

    // 이벤트 리스너 등록
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" || event.code === "ArrowUp") jump();
    });

    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("restartButton").addEventListener("click", restartGame);
});