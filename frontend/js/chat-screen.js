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

// // 입력값에 prohibitedWords 중 어떤 것이 들어있는지 체크하고 없으면 false, 있으면 들어있는 단어들을 배열로 리턴
// const validateInput = () => {
//   const userInput = inputText.value;
//   const prohibitedWordsInInput = prohibitedWords.filter((word) =>
//     userInput.includes(word)
//   );
//   return prohibitedWordsInInput.length === 0 ? false : prohibitedWordsInInput;
// };

// 입력값 비정상인지 체크
const isInputValid = () => {
  if (inputField.innerText === "") {
    return false;
  } else if (inputField.innerText.length > inputMaxLength) {
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

  // 입력값 비정상이면 입력 막기
  if (!isInputValid()) {
    return;
  }

  // 입력값 정상이면
  const sanitizedUserInput = getUserInputNew();
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
    displayFailedPopup(); // 화면에 3초간 팝업 띄우기. 팝업 안에는 "챗봇이 죽었어요ㅠㅠ"라고 적혀있음
    chatInterface.removeChild(loadingIcon);
  }
});

// 엔터키로도 보내기
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  }
});

// // 임시 챗 생성 버튼
// const assistantBtn = document.querySelector(".assistant-btn");
// const userBtn = document.querySelector(".user-btn");

// assistantBtn.addEventListener("click", () => {
//   displayChat("Hello, how can I help you?", false);
//   chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
// });
// userBtn.addEventListener("click", () => {
//   displayChat("I need help with my order", true);
//   chatScrollbox.scrollTop = chatScrollbox.scrollHeight;
// });

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
