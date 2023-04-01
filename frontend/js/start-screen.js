const mbtiBtns = document.querySelectorAll(".mbti-btn");
const no1 = document.querySelector(".no1");
const no2 = document.querySelector(".no2");
const no3 = document.querySelector(".no3");
const no4 = document.querySelector(".no4");
const mbti = ["i", "s", "t", "j"]; // mbti 값 담아줄 변수
const mainText = document.querySelector(".main-text");
const mbtiKeywords = {
  // is** ttff 순, jpjp 순
  istj: "ISTJ 키워드",
  istp: "ISTP 키워드",
  isfj: "ISFJ 키워드",
  isfp: "ISFP 키워드",
  // in**
  intj: "INTJ 키워드",
  intp: "INTP 키워드",
  infj: "INFJ 키워드",
  infp: "INFP 키워드",
  // es**
  estj: "ESTJ 키워드",
  estp: "ESTP 키워드",
  esfj: "ESFJ 키워드",
  esfp: "ESFP 키워드",
  // en**
  entj: "ENTJ 키워드",
  entp: "ENTP 키워드",
  enfj: "ENFJ 키워드",
  enfp: "ENFP 키워드",
};

// 스타트 스크린
// mbti 버튼 클릭 시 뒤집기 애니메이션
for (let i = 0; i < mbtiBtns.length; i++) {
  mbtiBtns[i].addEventListener("click", () => {
    mbtiBtns[i].classList.toggle("flipped");
    // 애니메이션
    mbtiBtns[i].classList.remove("flip");
    mbtiBtns[i].offsetWidth = mbtiBtns[i].offsetWidth;
    mbtiBtns[i].classList.add("flip");
  });
}
// mbti 버튼들 클릭시 글자 바꿔주기
const flipTime = 250; // 글자 바뀌는 시간
no1.addEventListener("click", () => {
  if (no1.classList.contains("flipped")) {
    mbti[0] = "e";
    setTimeout(() => {
      no1.childNodes[0].innerText = "E";
    }, flipTime);
  } else {
    mbti[0] = "i";
    setTimeout(() => {
      no1.childNodes[0].innerText = "I";
    }, flipTime);
  }
});
no2.addEventListener("click", () => {
  if (no2.classList.contains("flipped")) {
    mbti[1] = "n";
    setTimeout(() => {
      no2.childNodes[0].innerText = "N";
    }, flipTime);
  } else {
    mbti[1] = "s";
    setTimeout(() => {
      no2.childNodes[0].innerText = "S";
    }, flipTime);
  }
});
no3.addEventListener("click", () => {
  if (no3.classList.contains("flipped")) {
    mbti[2] = "f";
    setTimeout(() => {
      no3.childNodes[0].innerText = "F";
    }, flipTime);
  } else {
    mbti[2] = "t";
    setTimeout(() => {
      no3.childNodes[0].innerText = "T";
    }, flipTime);
  }
});
no4.addEventListener("click", () => {
  if (no4.classList.contains("flipped")) {
    mbti[3] = "p";
    setTimeout(() => {
      no4.childNodes[0].innerText = "P";
    }, flipTime);
  } else {
    mbti[3] = "j";
    setTimeout(() => {
      no4.childNodes[0].innerText = "J";
    }, flipTime);
  }
});

// mbti 버튼 클릭 시 main-text 바꿔주기
for (let i = 0; i < mbtiBtns.length; i++) {
  mbtiBtns[i].addEventListener("click", () => {
    const mbtiStr = mbti.join("");
    mainText.innerText = mbtiKeywords[mbtiStr];
  });
}
