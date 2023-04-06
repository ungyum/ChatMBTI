const mbtiBtnChat = document.querySelectorAll(".mbti-btn");
const no1 = document.querySelector(".no1");
const no2 = document.querySelector(".no2");
const no3 = document.querySelector(".no3");
const no4 = document.querySelector(".no4");
const mbti = ["i", "s", "t", "j"]; // mbti 값 담아줄 변수
const mainText = document.querySelector(".main-text");
const mbtiKeywords = {
  // IS** ttff 순, jpjp 순
  istj: "ISTJ 키워드",
  istp: "ISTP 키워드",
  isfj: "ISFJ 키워드",
  isfp: "ISFP 키워드",
  // IN** ttff 순, jpjp 순
  intj: "INTJ 키워드",
  intp: "INTP 키워드",
  infj: "INFJ 키워드",
  infp: "INFP 키워드",
  // ES** ttff 순, jpjp 순
  estj: "ESTJ 키워드",
  estp: "ESTP 키워드",
  esfj: "ESFJ 키워드",
  esfp: "ESFP 키워드",
  // EN** ttff 순, jpjp 순
  entj: "ENTJ 키워드",
  entp: "ENTP 키워드",
  enfj: "ENFJ 키워드",
  enfp: "ENFP 키워드",
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
  mainText.innerText = mbtiKeywords[mbtiStr];
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
    updateKeyword(); // 키워드(main-text) 바꿔주기
    sessionStorage.setItem("mbti", mbti.join("")); // mbti 세션스토리지에 저장
  });
}
