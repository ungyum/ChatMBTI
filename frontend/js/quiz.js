let ans = "INTP";
// 백엔드용
const mbtiList = [
  // IS** ttff 순, jpjp 순
  "isfj",
  "istj",
  "isfp",
  "intj",
  // IN** ttff 순, jpjp 순
  "intp",
  "infj",
  "infp",
  "estj",
  // ES** ttff 순, jpjp 순
  "estp",
  "esfj",
  "esfp",
  "entj",
  // EN** ttff 순, jpjp 순
  "entp",
  "enfj",
  "enfp",
  "istp",
];

// mbti 고유코드
const encryptedMBTI = [
  1, 2, 3, 5, 7, 6, 10, 14, 15, 21, 35, 30, 42, 70, 105, 210,
];

// 답변을 받아서 고유코드로 변환
const encryptGuess = () => {
  let guess; // string
  const toCalculate = [];
  switch (guess[0]) {
    case "E":
      toCalculate.push(1);
      break;
    case "I":
      toCalculate.push(2);
    default:
      alert("올바른 값이 아닙니다.");
      break;
  }
};

quizBtn.addEventListener("click", () => {
  // 채팅창 지워주고
  chatInterface.innerHTML = "";
  // 챗스크린에 quiz 넣어주고
  chatScreen.classList.add("quiz");
  // mbti-btn & ans-btn에 hidden 지워주고
  mbtiBtnChat.classList.remove("hidden");
  ansBtn.classList.remove("hidden");
  pickRandomMBTI();
});

// 랜덤 mbti 뽑기 함수
const pickRandomMBTI = () => {
  // 0-15까지 랜덤넘버 만들어주고
  const randomNum = Math.floor(Math.random() * 16);
  ans = mbtiList[randomNum];
};
