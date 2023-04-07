const chatInterface = document.querySelector(".chat-interface");
const chatScrollbox = document.querySelector(".chat-scrollbox");
const mbtiBtnBoxChat = document.querySelector(".mbti-buttons-chat");
const ansBtn = document.querySelector(".ans-btn");
const quizUI = document.querySelector(".quiz-ui");
const helpPopupMbti = document.querySelector(".help-popup-mbti");
// 새로 만든 input
const inputFieldContainer = document.querySelector(".input-field-container");
const inputField = document.querySelector(".input-field");
const sendBtn = document.querySelector(".send-btn");

// 스크롤 내려주기
const scrollChat = () => {
  chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
};

// 채팅 리셋
const initChat = () => {
  chatInterface.innerHTML = "";
  chatHistory.length = 0;
  const blankspace = document.createElement("div");
  blankspace.classList.add("blankspace");
  blankspace.style.setProperty(
    "--blankspace-height",
    chatScrollbox.offsetHeight + "px"
  );
  chatInterface.appendChild(blankspace);
  inputField.setAttribute("data-placeholder", "안녕?");
};

// 메시지 넣기 함수, message: 메시지내용, isUser: 사용자인지 아닌지
const displayChat = (message, isUser) => {
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
  // blackspace의 --blankspace-height 값을 재설정: chatScrollbox의 높이 - chatInterface안의 chatMessage 들의 높이의 총합
  const blankspace = document.querySelector(".blankspace");
  if (blankspace.style.getPropertyValue("--blankspace-height") === "0px") {
    chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
    return;
  }
  const chatMessages = document.querySelectorAll(".chat-message");
  const chatMessagesHeight = Array.from(chatMessages).reduce(
    (acc, cur) => acc + cur.offsetHeight + 10,
    0
  );
  if (chatMessagesHeight > chatScrollbox.offsetHeight) {
    blankspace.style.setProperty("--blankspace-height", 0);
  } else {
    blankspace.style.setProperty(
      "--blankspace-height",
      chatScrollbox.offsetHeight - chatMessagesHeight + "px"
    );
  }
  chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
};
// 부품: message를 .chat 중 가장 마지막거에 넣기
const addChatText = (message) => {
  const chatTexts = document.querySelectorAll(".chat");
  const lastChatText = chatTexts[chatTexts.length - 1];
  lastChatText.innerText = message;
};

const getUserInputNew = () => {
  // 입력값 청소해주기
  const messageDirty = inputField.innerText;
  const messageClean = DOMPurify.sanitize(messageDirty);
  inputField.innerText = "";
  return messageClean;
};

const displayFailedPopup = () => {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerText = "챗봇이 죽었어요ㅠㅠ";
  chatInterface.appendChild(popup);
  setTimeout(() => {
    chatInterface.removeChild(popup);
  }, 3000);
};

const displayLoadingIcon = () => {
  const loadingIcon = document.createElement("i");
  loadingIcon.classList.add("loading-icon", "fas", "fa-spinner", "fa-spin");
  chatInterface.appendChild(loadingIcon);
  scrollChat();
  return loadingIcon;
};

const appendChatHistory = (user, assistant) => {
  chatHistory.push({ role: "user", content: user });
  chatHistory.push({ role: "assistant", content: assistant });
};

const isQuiz = () => {
  return chatScreen.classList.contains("quiz");
};

const prohibitedWords = ["mbti", "성격", "유형"];

// 입력값에 prohibitedWords 포함되어있는지 체크: find를 활용해서 배열에 포함된 단어가 있는지 체크 후 있으면 그 단어 리턴
const validateInput = () => {
  const userInput = inputField.innerText.toLowerCase();
  const prohibitedWord = prohibitedWords.find((word) =>
    userInput.includes(word)
  );
  if (prohibitedWord) {
    anim.createPopupUnder(
      inputFieldContainer,
      "warning-popup",
      `금지어 포함됨: ${prohibitedWord}`,
      1500
    );
    return false;
  } else {
    return true;
  }
};

// 입력값 너무 긴지 체크
const isInputTooLong = () => {
  if (inputField.innerText.length > inputMaxLength) {
    // inputFieldContainer에 child를 달아서 글자수가 70자를 초과한다고 표시
    anim.createPopupUnder(
      inputFieldContainer,
      "warning-popup",
      `${inputMaxLength}자 이하로 입력해주세요!`,
      1500
    );
    return false;
  } else {
    return true;
  }
};
// 시작 @@@@@@@@@@@@@@@@@@@@@@@

// 채팅 기록: 유저챗이면 {role: "user", content: "메시지"}, 어시스턴트챗이면 {role: "assistant", content: "메시지"}
const chatHistory = [];
let mbti = sessionStorage.getItem("mbti");
if (!isQuiz()) {
  helpPopupMbti.innerText = mbti.toUpperCase();
}
let inputMaxLength = 70; // number

initChat();
inputField.focus();

// 보내기 버튼
sendBtn.addEventListener("click", async (e) => {
  // UX 설정
  e.preventDefault();
  inputField.focus();

  // 입력값 너무 길면 입력 막기
  if (!isInputTooLong()) {
    return;
  }

  // 퀴즈중 일때 입력값 확인
  if (isQuiz()) {
    if (inputField.innerText === "") {
      return;
    }
    if (!validateInput()) {
      return;
    }
  }

  // 입력값 정상이면

  let sanitizedUserInput = getUserInputNew();
  if (inputField.innerText == "") {
    sanitizedUserInput = inputField.getAttribute("data-placeholder");
  }
  inputField.setAttribute("data-placeholder", getChatRecom()); // placeholder 바꾸기
  displayChat(sanitizedUserInput, true);
  const loadingIcon = displayLoadingIcon();
  // api 호출
  try {
    const assistantReply = await api.postChat(
      sanitizedUserInput,
      chatHistory,
      mbti
    ); // 호출 실패시 이 라인 이후로는 무시되고 catch로 넘어감
    chatInterface.removeChild(loadingIcon);
    displayChat(assistantReply, false);
    appendChatHistory(sanitizedUserInput, assistantReply); // 중요!!!! user history는 반드시 api 호출 후에 남겨줘야됨. 아니면 호출시 userInput 두번 들어감
  } catch {
    // 화면에 3초간 팝업 띄우기. 팝업 안에는 "챗봇이 죽었어요ㅠㅠ"라고 적혀있음
    anim.createPopupUnder(
      inputFieldContainer,
      "warning-popup",
      "챗봇이 죽었어요ㅠㅠ",
      1500
    );
    chatInterface.removeChild(loadingIcon);
  }
});

inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!e.shiftKey) {
      e.preventDefault();
    }
  }
});
// 엔터키로도 보내기
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (!e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  }
});

// // 임시 챗 생성 버튼
const assistantBtn = document.querySelector(".assistant-btn");
const userBtn = document.querySelector(".user-btn");

assistantBtn.addEventListener("click", () => {
  displayChat("Hello, how can I help you?", false);
  chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
});
userBtn.addEventListener("click", () => {
  displayChat("I need help with my order", true);
  chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
});

// 챗 추천 리스트
const chatRecom = [
  "안녕, 만나서 반가워!",
  "너가 제일 좋아하는 색깔이 뭐야?",
  "우리 동네에 있는 맛집 좀 추천해줘.",
  "오늘 날씨 어때?",
  "너 이번 주말에 뭐해?",
  "지금 할 것 좀 추천해줘.",
  "인간이 느끼는 감정이란 뭘까?",
  "인공지능에 대해서 어떻게 생각해?",
  "너가 가장 좋아하는 책이 뭐야?",
  "심심한데 드립 하나만 쳐줘.",
  "너는 심심할때 주로 뭐해?",
  "인공지능의 지능과 사람의 지능 중에 어느 것이 더 높아?",
  "인공지능이 자아를 가질 수 있다던데, 진짜야?",
  "뉴욕에 있는 창문의 개수를 다 세면 대략 몇개일까?",
  "문의 개수와 바퀴의 개수 중 뭐가 더 많을까?",
  "지구가 둥근 걸 증명해봐.",
  "내가 지금 생각하고 있는 걸 맞춰봐.",
  "인생은 공평해 불공평해?",
];

// 랜덤 챗 추천 가져와서 리턴하는 함수
const getChatRecom = () => {
  const randomIdx = Math.floor(Math.random() * chatRecom.length);
  return chatRecom[randomIdx];
};
