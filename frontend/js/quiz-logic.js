const ansValue = document.querySelector(".ans-value");
const triesValue = document.querySelector(".tries-value");

let guess = ["?", "?", "?", "?"];
let ans;
let tries;

// 백엔드용
const mbtiList = [
  // IS** ttff 순, jpjp 순
  "istj", //0000
  "istp", //0001
  "isfj", //0010
  "isfp", //0011
  // IN** ttff 순, jpjp 순
  "intj", //0100
  "intp", //0101
  "infj",
  "infp",
  // ES** ttff 순, jpjp 순
  "estj",
  "estp",
  "esfj",
  "esfp",
  // EN** ttff 순, jpjp 순
  "entj",
  "entp",
  "enfj",
  "enfp",
];

// 시작화면에서 퀴즈버튼 눌렀을 때
quizStartBtn.addEventListener("click", () => {
  initGame();
});

// 새 게임 만들기
const initGame = () => {
  // 채팅창 지워주고
  chatInterface.innerHTML = "";
  // 랜덤 mbti 골라주고
  pickRandomMBTI();
  // default 넣어주고
  for (let i = 0; i < mbtiBtnBoxChat.children.length; i++) {
    mbtiBtnBoxChat.children[i].classList.add("default");
  }
  // guess 초기화
  guess = ["?", "?", "?", "?"];
  // 물음표 넣어주고
  for (let i = 0; i < mbtiBtnChat.length; i++) {
    mbtiBtnChat[i].children[0].innerText = "?";
  }
  // tries 초기화
  tries = 0;
  // 결과창 숨기기
  reslutPopup.classList.add("hidden");
};
// 랜덤 mbti 뽑기 함수
const pickRandomMBTI = () => {
  // 0-15까지 랜덤넘버 만들어주고
  const randomNum = Math.floor(Math.random() * 16);
  ans = randomNum;
};

// 결정하기 버튼 눌렀을 때
ansBtn.addEventListener("click", () => {
  getGuess();
  // default 있으면 경고창 띄우고
  if (checkDefault()) {
    alert("모든 문항을 선택해주세요!");
    return;
  }
  // guess가 정답이면
  if (parseInt(guess.join(""), 2) === ans) {
    showResultCorrect();
  } else {
    showResultWrong();
  }
});

// 결정하기 버튼 부품들
const getGuess = () => {
  for (let i = 0; i < 4; i++) {
    if (!mbtiBtnChat[i].classList.contains("default")) {
      // flipped 여부 guess 배열에 넣어주기
      if (mbtiBtnChat[i].classList.contains("flipped")) {
        guess[i] = 1;
      } else {
        guess[i] = 0;
      }
    }
  }
};
const checkDefault = () => {
  for (let i = 0; i < 4; i++) {
    if (mbtiBtnChat[i].classList.contains("default")) {
      return true;
    }
  }
};

// 채팅할때마다 tries 증가
sendBtn.addEventListener("click", () => {
  tries++;
});

// 결과창 @@@@@@@@@@@@@@@

// 맞았을 때 결과창
const showResultCorrect = () => {
  // tries 넣어주고
  triesValue.innerText = getTries();
  // 창 띄우기
  correctResultContainer.classList.remove("hidden");
  wrongResultContainer.classList.add("hidden");
  openPopup(reslutPopup, "fade-in", 700);
};

// 틀렸을 때 결과창
const showResultWrong = () => {
  // 정답 넣어주고
  ansValue.innerText = getSecret();
  // 창 띄우기
  correctResultContainer.classList.add("hidden");
  wrongResultContainer.classList.remove("hidden");
  openPopup(reslutPopup, "fade-in", 700);
};

// 다시하기 버튼 눌렀을 때
regameBtns.forEach((regameBtn) => {
  regameBtn.addEventListener("click", () => {
    // 팝업 숨기고
    reslutPopup.classList.add("hidden");
    initGame();
  });
});

// ans로부터 mbti 구하기
const getSecret = () => {
  const m = [];
  const a = ans.toString(2).padStart(4, "0");
  for (let i = 0; i < 4; i++) {
    if (a[i] === "0") {
      m.push(mbtiBtnText[i].unflipped);
    } else {
      m.push(mbtiBtnText[i].flipped);
    }
  }
  return m.join("");
};

// const chatInterface = document.querySelector(".chat-interface");
// const sendBtn = document.querySelector(".send-btn");
// const inputText = document.querySelector(".input-text");
// const chatScrollbox = document.querySelector(".chat-scrollbox");
// const mbtiBtnBoxChat = document.querySelector(".mbti-buttons-chat");
// const ansBtn = document.querySelector(".ans-btn");
// const quizUI = document.querySelector(".quiz-ui");
// 보낸 챗 갯수 구하기: chat-interface에 들어있는 chat-message 중 user 클래스가 있는 것들의 갯수
const getTries = () => {
  return chatInterface.querySelectorAll(".user").length;
};
