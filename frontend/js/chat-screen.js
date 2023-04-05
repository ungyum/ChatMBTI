const chatInterface = document.querySelector(".chat-interface");
const sendBtn = document.querySelector(".send-btn");
const inputText = document.querySelector(".input-text");
const chatScrollbox = document.querySelector(".chat-scrollbox");
const mbtiBtnBoxChat = document.querySelector(".mbti-buttons-chat");
const ansBtn = document.querySelector(".ans-btn");
const quizUI = document.querySelector(".quiz-ui");

// 채팅 기록: 유저챗이면 {role: "user", content: "메시지"}, 어시스턴트챗이면 {role: "assistant", content: "메시지"}
const chatHistory = [];

// 스크롤 내려주기
const scrollChat = () => {
  chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
};

// 채팅 리셋
const initChat = () => {
  chatInterface.innerHTML = "";
  chatHistory.length = 0;
};

// 메시지 넣기 함수, message: 메시지내용, isUser: 사용자인지 아닌지
const addChatMessage = (message, isUser) => {
  const chatMessage = document.createElement("div");
  chatMessage.classList.add("chat-message");
  chatMessage.classList.add(isUser ? "user" : "assistant");
  if (isUser) {
    chatMessage.innerHTML = `<span class="chat"></span>`;
  } else {
    chatMessage.innerHTML = `<img
            class="profile-pic"
            src="./assets/profile-icon.png"
            alt="profile pic"
          />
          <span class="chat"
            ></span
          >`;
  }
  chatInterface.appendChild(chatMessage);
  addChatText(message);
  chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
};
// 부품: message를 .chat 중 가장 마지막거에 넣기
const addChatText = (message) => {
  const chatTexts = document.querySelectorAll(".chat");
  const lastChatText = chatTexts[chatTexts.length - 1];
  lastChatText.innerText = message;
};

// 시작 @@@@@@@@@@@@@@@@
initChat();
inputText.focus();

// 보내기 버튼
sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  inputText.focus();
  // 입력값 비정상이면 입력 막기
  if (inputText.value === "") {
    return;
  }
  // 입력값 정상이면...
  // 입력값 청소해주고
  const messageDirty = inputText.value;
  const messageClean = DOMPurify.sanitize(messageDirty);
  inputText.value = "";
  // 챗박스 넣어주고
  addChatMessage(messageClean, true);

  // 챗봇 채팅을 postChat 함수로 보내고, 답이 올때까지 화면에 로딩중 아이콘 표시, 답이 오면 로딩중 아이콘 지우고, addChatMessage 함수로 화면에 챗봇 채팅 넣어주기
  const loadingIcon = document.createElement("i");
  loadingIcon.classList.add("loading-icon", "fas", "fa-spinner", "fa-spin");
  chatInterface.appendChild(loadingIcon);
  scrollChat();
  // api 호출
  const assistantChat = await api.postChat(messageClean, chatHistory);
  // 화면 표시
  chatInterface.removeChild(loadingIcon);
  addChatMessage(assistantChat, false);
  // 히스토리 남겨주고: user history는 반드시 api 호출 후에 남겨줘야됨
  chatHistory.push({ role: "user", content: messageClean });
  chatHistory.push({ role: "assistant", content: assistantChat });
});

// 엔터키로도 보내기
inputText.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

// 임시 챗 생성 버튼
// const assistantBtn = document.querySelector(".assistant-btn");
// const userBtn = document.querySelector(".user-btn");

// assistantBtn.addEventListener("click", () => {
//   addChatMessage("Hello, how can I help you?", false);
//   chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
// });
// userBtn.addEventListener("click", () => {
//   addChatMessage("I need help with my order", true);
//   chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
// });
