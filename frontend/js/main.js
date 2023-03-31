const startBtn = document.querySelector(".start-btn");
const startScreen = document.querySelector(".start-screen");
const chatScreen = document.querySelector(".chat-screen");
const backBtn = document.querySelector(".back-btn");
const chatInterface = document.querySelector(".chat-interface");
const sendBtn = document.querySelector(".send-btn");
const inputText = document.querySelector(".input-text");

// 화면 이동
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
});
backBtn.addEventListener("click", () => {
  startScreen.classList.remove("hidden");
  chatScreen.classList.add("hidden");
});

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

// 임시 생성 버튼
const assistantBtn = document.querySelector(".assistant-btn");
const userBtn = document.querySelector(".user-btn");
assistantBtn.addEventListener("click", () => {
  addChatMessage("Hello, how can I help you?", false);
});
userBtn.addEventListener("click", () => {
  addChatMessage("I need help with my order", true);
});

// 메시지 넣기, message: 메시지내용, isUser: 사용자인지 아닌지
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
