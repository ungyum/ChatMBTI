const quizStartBtn = document.querySelector(".quiz-start-btn");
const chatScreen = document.querySelector(".chat-screen");
const quizInformScreen = document.querySelector(".quiz-inform-screen");
const helpBtn = document.querySelector(".help-btn");
const helpPopup = document.querySelector(".help-popup");

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

// 팝업창 띄우기 함수
const openPopup = (popup, animation, duration = 300) => {
  popup.style.setProperty("--custom-duration", duration + "ms");
  popup.classList.add(animation);
  popup.classList.remove("hidden");
  setTimeout(() => {
    popup.classList.remove(animation);
    popup.style.removeProperty("--custom-duration");
  }, duration);
};

// 팝업창 닫기 함수
const closePopup = (popup, animation, duration = 300) => {
  popup.style.setProperty("--custom-duration", duration + "ms");
  popup.classList.add(animation);
  setTimeout(() => {
    popup.classList.add("hidden");
    popup.classList.remove(animation);
    popup.style.removeProperty("--custom-duration");
  }, duration);
};

// help-btn 누르면 팝업창 띄우기
helpBtn.addEventListener("click", () => {
  if (helpPopup.classList.contains("hidden")) {
    openPopup(helpPopup, "fade-in");
  } else {
    closePopup(helpPopup, "fade-out");
  }
});
