let guess = ["?", "?", "?", "?"];
let ans;
let winStreak = sessionStorage.getItem("winStreak");

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

// 새 게임 만들기
const initGame = () => {
  // 채팅 리셋해주고
  initChat();
  // 랜덤 mbti 골라주고
  const ans = pickRandomMBTI();
  // 세션스토리지 업뎃 + api 보낼 때 쓸 mbti도 업뎃
  sessionStorage.setItem("mbti", ans);
  mbti = ans;
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
  // mbtiBtnChat에 전부 flipped 넣어주기
  for (let i = 0; i < mbtiBtnChat.length; i++) {
    mbtiBtnChat[i].classList.add("flipped");
  }
};
// 랜덤 mbti 뽑기 함수
const pickRandomMBTI = () => {
  // 0-15까지 랜덤넘버 만들어주고
  const randomNum = Math.floor(Math.random() * 16);
  ans = randomNum;
  return ans;
};

// 결정하기 버튼 부품들
const setGuessFromBtns = () => {
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
const containsDefault = () => {
  for (let i = 0; i < 4; i++) {
    if (mbtiBtnChat[i].classList.contains("default")) {
      return true;
    }
  }
};

// 맞았을 때 결과창
const showResultCorrect = (winStreak) => {
  // tries 넣어주고
  triesValue.innerText = getTries();
  // winStreak 넣어주고
  winStreakValue.innerText = winStreak;
  // 창 띄우기
  correctResultContainer.classList.remove("hidden");
  wrongResultContainer.classList.add("hidden");
  anim.openPopup(resultPopup, "fade-in", 700);
};
// 틀렸을 때 결과창
const showResultWrong = (highestScore) => {
  // 정답 넣어주고
  ansValue.innerText = getSecret();
  // 최고기록 넣어주고
  higestScoreValue.innerText = highestScore;
  // 창 띄우기
  correctResultContainer.classList.add("hidden");
  wrongResultContainer.classList.remove("hidden");
  anim.openPopup(resultPopup, "fade-in", 700);
};

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

// 보낸 챗 갯수 구하기: chat-interface에 들어있는 chat-message 중 user 클래스가 있는 것들의 갯수
const getTries = () => {
  return chatInterface.querySelectorAll(".user").length;
};

const isGuessCorrect = () => {
  return parseInt(guess.join(""), 2) === ans;
};

// 연승 기록 증가
const incrementWinStreak = () => {
  // 첫게임이면 0으로 설정
  if (winStreak === undefined) {
    winStreak = 0;
    sessionStorage.setItem("winStreak", winStreak);
  }
  winStreak++;
  sessionStorage.setItem("winStreak", winStreak);
};
// 최고기록 가져오기
const getHighestScore = () => {
  if (winStreak === undefined) {
    return 0;
  } else {
    return winStreak;
  }
};

// 시작 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// 시작화면에서 퀴즈버튼 눌렀을 때
quizStartBtn.addEventListener("click", () => {
  initGame();
});

// 결정하기 버튼 눌렀을 때
ansBtn.addEventListener("click", () => {
  setGuessFromBtns(); // 버튼으로부터 guess 값 가져오고

  // default 있으면 경고창 띄우고 리턴
  if (containsDefault()) {
    alert("모든 문항을 선택해주세요!");
    return;
  }

  // guess가 정답이면
  if (isGuessCorrect()) {
    incrementWinStreak();
    showResultCorrect(winStreak);
  } else {
    // 최고기록 가져온 후 winStreak 초기화 후 결과창 띄우기
    const highestScore = getHighestScore();
    winStreak = 0;
    sessionStorage.setItem("winStreak", winStreak);
    showResultWrong(highestScore);
  }
});

// 다시하기 버튼 눌렀을 때
regameBtns.forEach((regameBtn) => {
  regameBtn.addEventListener("click", (e) => {
    // 올라가있을땐 클릭방지
    if (resultPopup.classList.contains("result-popup-up")) {
      return;
    }
    // 팝업 숨기고 재시작
    anim.closePopup(resultPopup, "fade-out", 700);
    initGame();
  });
});
