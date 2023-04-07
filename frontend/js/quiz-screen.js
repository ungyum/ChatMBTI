const mbtiBtnChat = document.querySelectorAll(".mbti-btn-chat");
const resultPopup = document.querySelector(".result-popup");
const regameBtns = document.querySelectorAll(".regame-btn");
const resultContainers = document.querySelectorAll(".result-container");
const correctResultContainer = document.querySelector(
  ".correct-result-container"
);
const wrongResultContainer = document.querySelector(".wrong-result-container");
const ansValue = document.querySelector(".ans-value");
const triesValue = document.querySelector(".tries-value");
const winStreakValue = document.querySelector(".win-streak-value");
const higestScoreValue = document.querySelector(".highest-score-value");
const seeChatBtns = document.querySelectorAll(".see-chat-btn");

const focusInput = () => {
  inputField.focus();
};

const resultPopupDown = () => {
  resultPopup.style.transition = "0s";
  resultPopup.style.top = "0";
  resultPopup.style.height = "100%";
  setTimeout(() => {
    resultPopup.style.transition = "0.5s";
    resultPopup.classList.remove("result-popup-up");
  }, 0);
};

const resultPopupUp = () => {
  // 팝업 올리고
  resultContainers.forEach((resultContainer) => {
    resultContainer.style.setProperty(
      "--screen-height",
      body.offsetHeight + "px"
    );
  });
  resultPopup.classList.add("result-popup-up");
  // 뒷배경 치워주기
  setTimeout(() => {
    resultPopup.style.top = "50%";
    resultPopup.style.height = "0";
  }, 500);
};

// 시작 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// 퀴즈시작버튼 눌렀을 때
quizStartBtn.addEventListener("click", () => {
  anim.screenTransitionFade(quizInformScreen, chatScreen, 300, focusInput);
});

// mbtiBtnChat 누르면
// 애니메이션
for (let i = 0; i < mbtiBtnChat.length; i++) {
  mbtiBtnChat[i].addEventListener("click", () => {
    // 글자 바꿔주는거 확인용
    mbtiBtnChat[i].classList.toggle("flipped");
    // 애니메이션
    mbtiBtnChat[i].classList.remove("flip");
    mbtiBtnChat[i].offsetWidth = mbtiBtnChat[i].offsetWidth;
    mbtiBtnChat[i].classList.add("flip");
  });
}
// 코드줄이기 용
const mbtiBtnText = [
  { unflipped: "I", flipped: "E" },
  { unflipped: "S", flipped: "N" },
  { unflipped: "T", flipped: "F" },
  { unflipped: "J", flipped: "P" },
];
// 글자 바꿔주기
const flipTime = 250; // 글자 바뀌는 시간
for (let i = 0; i < mbtiBtnChat.length; i++) {
  mbtiBtnChat[i].addEventListener("click", () => {
    // 처음 누르면 default 지워주고
    mbtiBtnChat[i].classList.remove("default");
    // 처음 눌러서 default가 지워진 버튼이면 flipped가 없을 때 내부 span 태그에 I 넣어주고
    if (mbtiBtnChat[i].classList.contains("flipped")) {
      setTimeout(() => {
        mbtiBtnChat[i].children[0].innerText = mbtiBtnText[i].flipped;
      }, flipTime);
    } else {
      setTimeout(() => {
        mbtiBtnChat[i].children[0].innerText = mbtiBtnText[i].unflipped;
      }, flipTime);
    }
  });
}

// result-container 올라가있을 때 클릭효과
resultContainers.forEach((resultContainer) => {
  resultContainer.addEventListener("click", () => {
    if (resultPopup.classList.contains("result-popup-up")) {
      resultPopupDown();
    }
  });
});

// 채팅 확인하기 버튼 눌렀을 때
for (let i = 0; i < 2; i++) {
  seeChatBtns[i].addEventListener("click", (e) => {
    e.stopPropagation(); // 부모에게 클릭 전파 막기
    resultPopupUp();
  });
}
