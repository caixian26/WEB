document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 300;

    let gravity = 0.5;
    let isJumping = false;
    let isSliding = false;
    let velocityY = 0;
    let velocityX = 3;
    let score = 0;
    let obstacles = [];
    let gameOver = false;
    let gameRunning = false;
    let scoreInterval;

    const player = {
        x: 50,
        y: canvas.height - 50,
        width: 30,
        height: 30,
        color: "white"
    };

    function jump() {
        if (!isJumping && !gameOver) {
            velocityY = -10;
            isJumping = true;
        }
    }

    function startSlide() {
        if (!isJumping && !gameOver) {
            isSliding = true;
            player.height = 15; // 슬라이딩 시 낮아짐
        }
    }

    function stopSlide() {
        if (isSliding) {
            isSliding = false;
            player.height = 30;
        }
    }

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space" || event.code === "ArrowUp") {
            jump();
        }
        if (event.code === "ArrowDown") {
            startSlide();
        }
    });

    document.addEventListener("keyup", function (event) {
        if (event.code === "ArrowDown") {
            stopSlide();
        }
    });

    function createObstacle() {
        if (gameRunning) {
            let obstacleType = Math.random() > 0.5 ? "jump" : "slide"; // 50% 확률로 점프 or 슬라이드 장애물
            let obstacleHeight = obstacleType === "jump" ? 30 : 15; // 점프 장애물(높이 30), 슬라이드 장애물(높이 15)
            let obstacleY = obstacleType === "jump" ? canvas.height - obstacleHeight : canvas.height - 70; // 슬라이딩 장애물은 공중

            obstacles.push({
                x: canvas.width,
                y: obstacleY,
                width: 30,
                height: obstacleHeight,
                color: "red",
                type: obstacleType
            });
        }
    }

    function updateObstacles() {
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].x -= velocityX;

            if (
                !gameOver &&
                player.x < obstacles[i].x + obstacles[i].width &&
                player.x + player.width > obstacles[i].x &&
                player.y < obstacles[i].y + obstacles[i].height &&
                player.y + player.height > obstacles[i].y
            ) {
                gameOver = true;
                gameRunning = false;
                clearInterval(scoreInterval);
                document.getElementById("scoreDisplay").textContent = "최종 점수: " + score;
                document.getElementById("restartButton").style.display = "block";
                return;
            }
        }

        obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    }

    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        velocityY += gravity;
        player.y += velocityY;

        if (player.y >= canvas.height - player.height) {
            player.y = canvas.height - player.height;
            isJumping = false;
        }

        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);

        updateObstacles();
        for (let obstacle of obstacles) {
            ctx.fillStyle = obstacle.color;
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }

        // **게임 캔버스 내부 우측 상단에 실시간 점수 표시**
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText("점수: " + score, canvas.width - 80, 20);

        requestAnimationFrame(gameLoop);
    }

    function startGame() {
        if (gameRunning) return;

        gameRunning = true;
        gameOver = false;
        score = 0;
        obstacles = [];
        velocityY = 0;

        document.getElementById("scoreDisplay").textContent = "";
        document.getElementById("startButton").style.display = "none";
        document.getElementById("restartButton").style.display = "none";

        scoreInterval = setInterval(() => {
            if (gameRunning) {
                score += 10;
            }
        }, 1000);

        setInterval(createObstacle, 2000);
        gameLoop();
    }

    function restartGame() {
        gameRunning = false;
        clearInterval(scoreInterval);
        startGame();
    }

    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("restartButton").addEventListener("click", restartGame);
});