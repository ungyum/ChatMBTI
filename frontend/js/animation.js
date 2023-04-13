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
  // 3번: (optional) 애니메이션 시간 (ms) - number - 300
  // 4번: (optional) 애니메이션 끝나고 실행할 함수 - function - () => {}
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
  openPopup: function (popup, animation, duration = undefined) {
    if (duration) {
      popup.style.setProperty("--custom-duration", duration + "ms");
    }
    popup.classList.remove(animation);
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add(animation);
    popup.classList.remove("hidden");
  },

  // 팝업창 닫기 (인자는 동일)
  closePopup: function (popup, animation, duration = undefined) {
    if (duration) {
      popup.style.setProperty("--custom-duration", duration + "ms");
    }
    popup.classList.remove(animation);
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add(animation);
    popup.classList.add("hidden");
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

  // 팝업 자체를 만들어서 넣어주는 함수
  // 1번: 팝업이 들어갈 부모 - element
  // 2번: 팝업의 css class 이름 - string
  // 3번: 팝업의 innerText 내용 - string
  // 4번: (optional) 팝업이 표시될 시간 (ms) - number: 기본값 2000
  // 5번: (optional) 팝업의 애니메이션 시간 (ms) - number: 기본값 300
  // 6, 7번: (optional) 팝업 시작/끝 애니메이션 - string: 기본값 fade-in/fade-out
  displayPopupUnder: function (
    parentElement,
    popupClassNameForCss,
    popupInnerText,
    popupDuration = 1500,
    animDuration = 300,
    startAnimation = "fade-in",
    endAnimation = "fade-out"
  ) {
    const popup = document.createElement("div");
    popup.classList.add(popupClassNameForCss, startAnimation);
    popup.style.setProperty("--custom-duration", animDuration + "ms");
    popup.innerText = popupInnerText;
    parentElement.appendChild(popup);
    setTimeout(() => {
      popup.classList.remove(startAnimation);
      popup.classList.add(endAnimation);
      setTimeout(() => {
        parentElement.removeChild(popup);
      }, animDuration);
    }, popupDuration);
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
