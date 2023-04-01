const startBtn = document.querySelector(".start-btn");
const startScreen = document.querySelector(".start-screen");
const chatScreen = document.querySelector(".chat-screen");
const backBtn = document.querySelector(".back-btn");
const chatInterface = document.querySelector(".chat-interface");
const sendBtn = document.querySelector(".send-btn");
const inputText = document.querySelector(".input-text");
const mbtiBtns = document.querySelectorAll(".mbti-btn");
const no1 = document.querySelector(".no1");
const no2 = document.querySelector(".no2");
const no3 = document.querySelector(".no3");
const no4 = document.querySelector(".no4");

// 화면 이동
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
});
backBtn.addEventListener("click", () => {
  startScreen.classList.remove("hidden");
  chatScreen.classList.add("hidden");
});

// 스타트 스크린
// mbti 버튼 클릭 시
for (let i = 0; i < mbtiBtns.length; i++) {
  mbtiBtns[i].addEventListener("click", () => {
    mbtiBtns[i].classList.toggle("flipped");
    // 애니메이션
    mbtiBtns[i].classList.remove("flip");
    mbtiBtns[i].offsetWidth = mbtiBtns[i].offsetWidth;
    mbtiBtns[i].classList.add("flip");
  });
}
// mbti 버튼들 글자 바꿔주기
const flipTime = 250; // 글자 바뀌는 시간
no1.addEventListener("click", () => {
  if (no1.classList.contains("flipped")) {
    setTimeout(() => {
      no1.childNodes[0].innerText = "E";
    }, flipTime);
  } else {
    setTimeout(() => {
      no1.childNodes[0].innerText = "I";
    }, flipTime);
  }
});
no2.addEventListener("click", () => {
  if (no2.classList.contains("flipped")) {
    setTimeout(() => {
      no2.childNodes[0].innerText = "N";
    }, flipTime);
  } else {
    setTimeout(() => {
      no2.childNodes[0].innerText = "S";
    }, flipTime);
  }
});
no3.addEventListener("click", () => {
  if (no3.classList.contains("flipped")) {
    setTimeout(() => {
      no3.childNodes[0].innerText = "F";
    }, flipTime);
  } else {
    setTimeout(() => {
      no3.childNodes[0].innerText = "T";
    }, flipTime);
  }
});
no4.addEventListener("click", () => {
  if (no4.classList.contains("flipped")) {
    setTimeout(() => {
      no4.childNodes[0].innerText = "P";
    }, flipTime);
  } else {
    setTimeout(() => {
      no4.childNodes[0].innerText = "J";
    }, flipTime);
  }
});

// 챗스크린
// 보내기 버튼
sendBtn.addEventListener("click", () => {
  let message = inputText.value;
  inputText.value = "";
  addChatMessage(message, true);
});
// 엔터키로도 보내기
inputText.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

// 임시 챗 생성 버튼
const assistantBtn = document.querySelector(".assistant-btn");
const userBtn = document.querySelector(".user-btn");
assistantBtn.addEventListener("click", () => {
  addChatMessage("Hello, how can I help you?", false);
});
userBtn.addEventListener("click", () => {
  addChatMessage("I need help with my order", true);
});

// 메시지 넣기 함수, message: 메시지내용, isUser: 사용자인지 아닌지
const addChatMessage = (message, isUser) => {
  const chatMessage = document.createElement("div");
  chatMessage.classList.add("chat-message");
  chatMessage.classList.add(isUser ? "user" : "assistant");
  if (isUser) {
    chatMessage.innerHTML = `<span class="chat">${message}</span>`;
  } else {
    chatMessage.innerHTML = `<img
            class="profile-pic"
            src="./assets/profile-icon.png"
            alt="profile pic"
          />
          <span class="chat"
            >${message}</span
          >`;
  }
  chatInterface.appendChild(chatMessage);
};
