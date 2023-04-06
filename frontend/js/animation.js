const quizStartBtn = document.querySelector(".quiz-start-btn");
const chatScreen = document.querySelector(".chat-screen");
const quizInformScreen = document.querySelector(".quiz-inform-screen");
const helpBtn = document.querySelector(".help-btn");
const helpPopup = document.querySelector(".help-popup");

// 애니메이션 함수 모음
const anim = {
  // 화면 전환
  // 1번: 기존 화면 - element
  // 2번: 바뀔 화면 - element
  // 3번: (optional) 애니메이션 시간 (ms) - number
  // 4번: (optional) 애니메이션 끝나고 실행할 함수 - function
  screenTransitionFade: function (
    screen1,
    screen2,
    duration = 300,
    runFunc = () => {}
  ) {
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
  },

  // 팝업창 띄우기
  // 1번: 팝업창 - element
  // 2번: css의 애니메이션 class 이름 - string
  // 3번: (optional) 애니메이션 시간 (ms) - number
  openPopup: function (popup, animation, duration = 300) {
    popup.style.setProperty("--custom-duration", duration + "ms");
    popup.classList.add(animation);
    popup.classList.remove("hidden");
    setTimeout(() => {
      popup.classList.remove(animation);
      popup.style.removeProperty("--custom-duration");
    }, duration);
  },

  // 팝업창 닫기 (인자는 동일)
  closePopup: function (popup, animation, duration = 300) {
    popup.style.setProperty("--custom-duration", duration + "ms");
    popup.classList.add(animation);
    setTimeout(() => {
      popup.classList.add("hidden");
      popup.classList.remove(animation);
      popup.style.removeProperty("--custom-duration");
    }, duration);
  },

  // 버튼 뒤집기
  // 1번: 버튼 - element
  // 2번: 버튼에 들어갈 문자 - string
  // 3번: (optional) 애니메이션 시간 (ms) - number
  flipBtn: function (btn, char, duration = 500) {
    btn.style.setProperty("--custom-duration", duration + "ms");
    btn.classList.remove("flip");
    btn.offsetWidth = btn.offsetWidth;
    btn.classList.add("flip");
    setTimeout(() => {
      btn.childNodes[0].innerText = char;
    }, duration / 2);
    setTimeout(() => {
      btn.style.removeProperty("--custom-duration");
    }, duration);
  },
};

// help-btn 누르면 팝업창 띄우기
helpBtn.addEventListener("click", () => {
  if (helpPopup.classList.contains("hidden")) {
    anim.openPopup(helpPopup, "fade-in");
  } else {
    anim.closePopup(helpPopup, "fade-out");
  }
});
