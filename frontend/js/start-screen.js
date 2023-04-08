const mbtiBtnChat = document.querySelectorAll(".mbti-btn");
const no1 = document.querySelector(".no1");
const no2 = document.querySelector(".no2");
const no3 = document.querySelector(".no3");
const no4 = document.querySelector(".no4");
const mbti = ["i", "s", "t", "j"]; // mbti 값 담아줄 변수
const mainText = document.querySelector(".main-text");
const keywordText = document.querySelector(".keyword-text");
const mbtiKeywords = {
  // IS** ttff 순, jpjp 순
  // prettier-ignore
  "istj": "남 얘기 듣는거 안좋아함, 원리원칙, 철벽 잘 침",
  // prettier-ignore
  "istp": "만사가 귀찮음, 낯가림, 무미건조",
  // prettier-ignore
  "isfj": "배려심 쩔음, 신중함, 열정적",
  // prettier-ignore
  "isfp": "귀찮음, 집에 가면 연락 두절됨, 약속 극혐",
  // IN** ttff 순, jpjp 순
  // prettier-ignore
  "intj": "혼자 있는거 좋아함, 공감 못함, 위로 못함",
  // prettier-ignore
  "intp": "자기가 잘난 줄 암, 진지충, 분석 좋아함",
  // prettier-ignore
  "infj": "내사람한테는 잘해줌, 생각 많음, 낯가림 심함",
  // prettier-ignore
  "infp": "잡생각 많음, 남한테 관심없음, 싫으면 진짜 싫은거",
  // ES** ttff 순, jpjp 순
  // prettier-ignore
  "estj": "현실적, 상황 분석, 자신에게만 집중",
  // prettier-ignore
  "estp": "약간 관종, 눈치 안봄, 리더쉽있음",
  // prettier-ignore
  "esfj": "남 눈치 많이 봄, 상담 잘함, 어색한거 못참음",
  // prettier-ignore
  "esfp": "성격 급함, 고집 셈, 사교성 개쩜",
  // EN** ttff 순, jpjp 순
  // prettier-ignore
  "entj": "남일에 노관심, 불도저같은 성격, 공감 못함",
  // prettier-ignore
  "entp": "개x마이웨이, 남일에 관심없음, 자신감 충만",
  // prettier-ignore
  "enfj": "시끄러움, 잘 맞춰줌, 눈치 빠름",
  // prettier-ignore
  "enfp": "감정기복 심함, 친절 베푸는거 좋아함, 호불호 심함",
};

// 코드줄이기 용
const mbtiBtnText = [
  { unflipped: "I", flipped: "E" },
  { unflipped: "S", flipped: "N" },
  { unflipped: "T", flipped: "F" },
  { unflipped: "J", flipped: "P" },
];

// mbti 변수에 값 넣어주기
const setMBTI = (i) => {
  if (mbtiBtnChat[i].classList.contains("flipped")) {
    const char = mbtiBtnText[i].flipped;
    mbti[i] = char.toLowerCase();
    return char;
  } else {
    const char = mbtiBtnText[i].unflipped;
    mbti[i] = char.toLowerCase();
    return char;
  }
};

// 키워드(main-text) 바꿔주기
const updateKeyword = () => {
  const mbtiStr = mbti.join("");
  keywordText.innerText = mbtiKeywords[mbtiStr];
};

// 시작 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// 세션 초기화
sessionStorage.setItem("mbti", mbti.join(""));

// mbti 버튼 클릭 시
for (let i = 0; i < 4; i++) {
  mbtiBtnChat[i].addEventListener("click", () => {
    mbtiBtnChat[i].classList.toggle("flipped"); // 가장 먼저 뒤집어졌다고 표시
    const char = setMBTI(i); // mbti 변수 update
    anim.flipBtn(mbtiBtnChat[i], char, 500); // 뒤집기 애니메이션
    mainText.classList.add("hidden"); // 메인 텍스트 숨기기
    keywordText.classList.remove("hidden"); // 메인 텍스트 숨기기
    updateKeyword(); // 키워드(main-text) 바꿔주기
    sessionStorage.setItem("mbti", mbti.join("")); // mbti 세션스토리지에 저장
  });
}
