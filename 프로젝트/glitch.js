document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll('.btn-glitch'); // 모든 버튼 선택

    if (buttons.length === 0) {
        console.error("btn-glitch 클래스를 가진 요소가 없음!");
        return;
    }

    var $filter = document.querySelector('svg defs filter'); // SVG 필터 찾기
    if (!$filter) {
        console.error("SVG 필터가 없음! HTML에 `<svg>` 필터를 추가했는지 확인하세요.");
    } else {
        console.log("SVG 필터 찾음!"); // 정상적으로 찾았는지 확인
    }

    var $turb = document.querySelector('#filter feTurbulence');
    if (!$turb) {
        console.error("SVG 필터 내부의 feTurbulence 요소가 없음!");
        return;
    }

    var turbVal = { val: 0.000001 };
    var turbValX = { val: 0.000001 };

    var glitchTimeline = function () {
        var timeline = new TimelineMax({
            repeat: -1,
            repeatDelay: 2,
            paused: true,
            onUpdate: function () {
                $turb.setAttribute('baseFrequency', turbVal.val + ' ' + turbValX.val);
            }
        });

        timeline.to(turbValX, 0.1, { val: 0.5 })
            .to(turbVal, 0.1, { val: 0.02 });
        timeline.set(turbValX, { val: 0.000001 })
            .set(turbVal, { val: 0.000001 });
        timeline.to(turbValX, 0.2, { val: 0.4 }, 0.4)
            .to(turbVal, 0.2, { val: 0.002 }, 0.4);
        timeline.set(turbValX, { val: 0.000001 })
            .set(turbVal, { val: 0.000001 });

        return {
            start: function () {
                timeline.play(0);
            },
            stop: function () {
                timeline.pause();
            }
        };
    };

    var btnGlitch = new glitchTimeline();

    // 모든 버튼에 이벤트 추가
    buttons.forEach(function (button) {
        button.addEventListener("mouseenter", function () {
            this.classList.add('btn-glitch-active');
            btnGlitch.start();
        });

        button.addEventListener("mouseleave", function () {
            this.classList.remove('btn-glitch-active');
            btnGlitch.stop();
        });
    });
});