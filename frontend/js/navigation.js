const startBtn = document.querySelector(".start-btn");
const backBtn = document.querySelector(".back-btn");
const quizBtn = document.querySelector(".quiz-btn");
const quizStartBtn = document.querySelector(".quiz-start-btn");
const startScreen = document.querySelector(".start-screen");
const chatScreen = document.querySelector(".chat-screen");
const quizInformScreen = document.querySelector(".quiz-inform-screen");
const helpBtn = document.querySelector(".help-btn");

// 화면전환 fade in/out 효과, 사용법: 첫인자 -> 둘째인자
const screenTransitionFade = (screen1, screen2) => {
  screen1.classList.add("fade-out");
  setTimeout(() => {
    screen1.classList.add("hidden");
    screen1.classList.remove("fade-out");
    screen2.classList.add("fade-in");
    screen2.classList.remove("hidden");
    setTimeout(() => {
      screen2.classList.remove("fade-in");
    }, 300);
  }, 300);
};

// 시작버튼 누르면 시작화면 -> 채팅화면
startBtn.addEventListener("click", () => {
  screenTransitionFade(startScreen, chatScreen);
});

// 시작화면 -> 채팅화면 시 help icon 애니메이션 주기
startBtn.addEventListener("click", () => {
  helpBtn.classList.remove("heart-beat");
  helpBtn.offsetWidth = helpBtn.offsetWidth;
  helpBtn.classList.add("heart-beat");
});

// 뒤로가기버튼 누르면 채팅화면 -> 시작화면
backBtn.addEventListener("click", () => {
  // 퀴즈 넘어갈때 mbti ????으로 바꿔놓은거 원상복구
  if (mbti.includes("?")) {
    for (let i = 0; i < 4; i++) {
      mbti[i] = mbtiHistory[i];
    }
  }
  screenTransitionFade(chatScreen, startScreen);
});

// 퀴즈버튼 누르면 시작화면 -> 설명화면
quizBtn.addEventListener("click", () => {
  screenTransitionFade(startScreen, quizInformScreen);
});
// 설명화면 -> 채팅화면
quizStartBtn.addEventListener("click", () => {
  screenTransitionFade(quizInformScreen, chatScreen);
});
