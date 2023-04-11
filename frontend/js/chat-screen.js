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
    const chat = document.createElement("span");
    chat.classList.add("chat");
    chatMessage.appendChild(chat);
  } else {
    const profilePic = document.createElement("img");
    profilePic.classList.add("profile-pic");
    profilePic.src = "./assets/profile-icon.png";
    profilePic.alt = "profile pic";
    chatMessage.appendChild(profilePic);
    const chat = document.createElement("span");
    chat.classList.add("chat");
    chatMessage.appendChild(chat);
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

const getUserInput = () => {
  // 입력값 청소해주기
  const messageDirty = inputField.innerText;
  const messageClean = DOMPurify.sanitize(messageDirty);
  inputField.innerText = "";
  return messageClean.trim();
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
  const assistantChatCount = 4; // 마지막 x개의 assistant 메시지만 들어감
  if (chatHistory.length > assistantChatCount * 2) {
    // chatHistory의 뒤에서 8개를 새로운 배열로 만들기
    let lastFewChats = chatHistory.slice(-assistantChatCount * 2);
    // chatHistory의 뒤에서 8개를 빤 나머지를 새로운 배열로 만들기
    let firstFewChats = chatHistory.slice(0, -assistantChatCount * 2);
    // firstFewChats 마지막 요소를 제거
    firstFewChats.pop();
    // firstFewChats에 lastFewChats를 합쳐서 새로운 배열로 만들기
    chatHistory = firstFewChats.concat(lastFewChats);
  }
  console.log(chatHistory);
};

const isQuiz = () => {
  return chatScreen.classList.contains("quiz");
};

// 입력값에 prohibitedWords 포함되어있는지 체크: find를 활용해서 배열에 포함된 단어가 있는지 체크 후 있으면 그 단어 리턴
const hasProhibitedWords = () => {
  const userInput = inputField.innerText.toLowerCase();
  const prohibitedWord = prohibitedWords.find((word) =>
    userInput.includes(word)
  );
  // 금지어 포함되어 있으면 팝업 띄우기
  if (prohibitedWord) {
    anim.displayPopupUnder(
      inputFieldContainer,
      "warning-popup",
      `금지어 포함됨: ${prohibitedWord}`,
      1500
    );
    return true;
  } else {
    return false;
  }
};

// 입력값 너무 긴지 체크
const isInputTooLong = () => {
  if (inputField.innerText.length > inputMaxLength) {
    // inputFieldContainer에 child를 달아서 글자수가 70자를 초과한다고 표시
    anim.displayPopupUnder(
      inputFieldContainer,
      "warning-popup",
      `${inputMaxLength}자 이하로 입력해주세요!`,
      1500
    );
    return true;
  } else {
    return false;
  }
};

// 랜덤 챗 추천 가져와서 리턴하는 함수
const getChatRecom = () => {
  const randomIdx = Math.floor(Math.random() * chatRecom.length);
  return chatRecom[randomIdx];
};

// 인풋 관련
const isOnlySpace = () => {
  return inputField.innerText !== "" && inputField.innerText.trim() === "";
};

// 시작 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// 챗 추천 모음
const chatRecom = [
  "안녕, 만나서 반가워!",
  "너가 제일 좋아하는 색깔이 뭐야?",
  "우리 동네에 있는 맛집 좀 추천해줘.",
  "오늘 날씨 어때?",
  "너 이번 주말에 뭐해?",
  "지금 할 것 좀 추천해줘.",
  "인공지능에 대해서 어떻게 생각해?",
  "너가 가장 좋아하는 책이 뭐야?",
  "심심한데 드립 하나만 쳐줘.",
  "너는 심심할때 주로 뭐해?",
  "인공지능의 지능과 사람의 지능 중에 어느 것이 더 높아?",
  "인공지능이 자아를 가질 수 있다던데, 진짜야?",
  "문의 개수와 바퀴의 개수 중 뭐가 더 많을까?",
  "내가 지금 생각하고 있는 걸 맞춰봐.",
  "인생은 공평해 불공평해?",
];

// 금지어 모음
const prohibitedWords = ["mbti", "성격", "유형"];

// 인풋 최댓값
let inputMaxLength = 70; // number

// 채팅 기록: 유저챗이면 {role: "user", content: "메시지"}, 어시스턴트챗이면 {role: "assistant", content: "메시지"}
let chatHistory = [];
// mbti 값 가져오기
let mbti = sessionStorage.getItem("mbti");
// 챗화면일때 달라지는점
if (!isQuiz()) {
  helpPopupMbti.innerText = mbti.toUpperCase(); // 헬프팝업에 mbti 표시
}

// 채팅창 초기화
initChat();
inputField.focus();

// 보내기 버튼 눌렀을 때
sendBtn.addEventListener("click", async (e) => {
  // UX 설정
  e.preventDefault();
  inputField.focus();

  // 보내기 비활성화 조건
  // 1. 공백으로만 구성되어있을 때
  // 2. 입력값이 70자 이상일 때
  if (isOnlySpace() || isInputTooLong()) {
    return;
  }

  // 퀴즈중 일때 검사할 것
  // 1. 퀴즈는 공백이어도 추천챗 안넣어줌
  // 2. 금지어 포함되어 있으면 안됨
  if (isQuiz()) {
    if ((inputField.innerText === "") | hasProhibitedWords()) {
      return;
    }
  }

  // 입력값 정상이면
  const sanitizedUserInput = getUserInput();
  // 입력안했으면 innerText에 placeholder 넣어주고 리턴
  if (sanitizedUserInput === "") {
    inputField.innerText = inputField.getAttribute("data-placeholder");
    return;
  }
  inputField.setAttribute("data-placeholder", getChatRecom()); // 랜덤 추천챗 골라와서 placeholder 바꿔주기
  displayChat(sanitizedUserInput, true); // 화면에 채팅 올라오고
  const loadingIcon = displayLoadingIcon(); // 답변 올때까지 로딩 아이콘
  sendBtn.disabled = true; // 보내기 버튼 비활성화
  // api 호출
  try {
    const assistantReply = await api.postChat(
      sanitizedUserInput,
      chatHistory,
      mbti
    ); // 호출 실패시 이 라인 이후로는 무시되고 catch로 넘어감
    chatInterface.removeChild(loadingIcon); // 로딩아이콘 지워주고
    displayChat(assistantReply, false); // assistant reply 화면에 올라옴
    appendChatHistory(sanitizedUserInput, assistantReply); // 중요!!!! user history는 반드시 api 호출 후에 남겨줘야됨. 아니면 호출시 userInput 두번 들어감
    sendBtn.disabled = false; // 보내기 버튼 활성화
  } catch {
    // api 실패 시 -> "챗봇이 죽었어요ㅠㅠ" 팝업 1.5초
    anim.displayPopupUnder(
      inputFieldContainer,
      "warning-popup",
      "ChatGPT가 아파요 ㅠㅠ 다시 시도해주세요",
      1500
    );
    chatInterface.removeChild(loadingIcon); // 로딩아이콘 지워주고
    sendBtn.disabled = false; // 보내기 버튼 활성화
  }
});

// 엔터키로도 보내기
inputField.onkeydown = (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    if (!e.shiftKey) {
      // 엔터키 눌렀을 때 보내기버튼 클릭해줄건데 shift는 제외
      e.preventDefault(); // 꼭 이 위치에 있어야함. 안그러면 엔터키 누르면 줄바꿈됨
      if (e.isComposing) {
        // 한글버그때매 이거 꼭 필요
        return;
      }
      sendBtn.click();
    }
  }
};
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    if (!e.shiftKey) {
      sendBtn.click();
    }
  }
});
