// const startBtn = document.querySelector(".start-btn");
// const backBtn = document.querySelector(".back-btn");
// const quizBtn = document.querySelector(".quiz-btn");
const quizStartBtn = document.querySelector(".quiz-start-btn");
// const startScreen = document.querySelector(".start-screen");
const chatScreen = document.querySelector(".chat-screen");
const quizInformScreen = document.querySelector(".quiz-inform-screen");
const helpBtn = document.querySelector(".help-btn");

// 화면전환 fade in/out 효과, 사용법: 첫인자 -> 둘째인자 (옵셔널: 애니메이션 시간, screen2 켜졌을 때 실행할 함수)
const screenTransitionFade = (
  screen1,
  screen2,
  duration = 300,
  runFunc = () => {}
) => {
  // css 애니메이션 시간도 적용
  screen1.style.setProperty("--custom-duration", duration + "ms");
  screen2.style.setProperty("--custom-duration", duration + "ms");
  // 애니메이션
  screen1.classList.add("fade-out");
  setTimeout(() => {
    screen1.classList.add("hidden");
    screen1.classList.remove("fade-out");
    screen2.classList.add("fade-in");
    screen2.classList.remove("hidden");
    runFunc();
    setTimeout(() => {
      screen2.classList.remove("fade-in");
      screen1.style.removeProperty("--custom-duration");
      screen2.style.removeProperty("--custom-duration");
    }, duration);
  }, duration);
  adjustScreenHeight(); // 요거는 빼줘도 됨. 만일을 대비해서 넣어준거
};

// // 시작버튼 누르면 시작화면 -> 채팅화면
// startBtn.addEventListener("click", () => {
//   screenTransitionFade(startScreen, chatScreen);
// });

// // 시작화면 -> 채팅화면 시 help icon 애니메이션 주기
// startBtn.addEventListener("click", () => {
//   helpBtn.classList.remove("heart-beat");
//   helpBtn.offsetWidth = helpBtn.offsetWidth;
//   helpBtn.classList.add("heart-beat");
// });

// // 뒤로가기버튼 누르면 채팅화면 -> 시작화면
// backBtn.addEventListener("click", () => {
//   screenTransitionFade(chatScreen, startScreen);
// });

// // 퀴즈버튼 누르면 시작화면 -> 설명화면
// quizBtn.addEventListener("click", () => {
//   screenTransitionFade(startScreen, quizInformScreen);
// });

// 설명화면 -> 채팅화면
quizStartBtn.addEventListener("click", () => {
  screenTransitionFade(quizInformScreen, chatScreen, 300, focusInput);
});

const focusInput = () => {
  inputText.focus();
};
