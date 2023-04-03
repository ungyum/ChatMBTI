const mbtiBtnChat = document.querySelectorAll(".mbti-btn-chat");

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
};

// 랜덤 mbti 뽑기 함수
const pickRandomMBTI = () => {
  // 0-15까지 랜덤넘버 만들어주고
  const randomNum = Math.floor(Math.random() * 16);
  ans = randomNum;
};

// mbtiBtnChat 누르면
// 코드줄이기 용
const mbtiBtnText = [
  { unflipped: "I", flipped: "E" },
  { unflipped: "S", flipped: "N" },
  { unflipped: "T", flipped: "F" },
  { unflipped: "J", flipped: "P" },
];
for (let i = 0; i < mbtiBtnChat.length; i++) {
  mbtiBtnChat[i].addEventListener("click", () => {
    // 처음 누르면 default 지워주고
    mbtiBtnChat[i].classList.remove("default");
    // 처음 눌러서 default가 지워진 버튼이면 flipped가 없을 때 내부 span 태그에 I 넣어주고
    if (mbtiBtnChat[i].classList.contains("flipped")) {
      mbtiBtnChat[i].children[0].innerText = mbtiBtnText[i].flipped;
    } else {
      mbtiBtnChat[i].children[0].innerText = mbtiBtnText[i].unflipped;
    }
  });
}

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
    alert("정답입니다!");
  } else {
    alert("틀렸습니다!");
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

sendBtn.addEventListener("click", () => {
  tries++;
});
