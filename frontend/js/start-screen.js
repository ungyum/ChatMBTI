const mbtiBtns = document.querySelectorAll(".mbti-btn");
const no1 = document.querySelector(".no1");
const no2 = document.querySelector(".no2");
const no3 = document.querySelector(".no3");
const no4 = document.querySelector(".no4");
let mbti = "istj"; // mbti 값 담아줄 변수

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
    setTimeout(() => {
      no1.childNodes[0].innerText = "E";
    }, flipTime);
  } else {
    setTimeout(() => {
      no1.childNodes[0].innerText = "I";
    }, flipTime);
  }
});
no2.addEventListener("click", () => {
  if (no2.classList.contains("flipped")) {
    setTimeout(() => {
      no2.childNodes[0].innerText = "N";
    }, flipTime);
  } else {
    setTimeout(() => {
      no2.childNodes[0].innerText = "S";
    }, flipTime);
  }
});
no3.addEventListener("click", () => {
  if (no3.classList.contains("flipped")) {
    setTimeout(() => {
      no3.childNodes[0].innerText = "F";
    }, flipTime);
  } else {
    setTimeout(() => {
      no3.childNodes[0].innerText = "T";
    }, flipTime);
  }
});
no4.addEventListener("click", () => {
  if (no4.classList.contains("flipped")) {
    setTimeout(() => {
      no4.childNodes[0].innerText = "P";
    }, flipTime);
  } else {
    setTimeout(() => {
      no4.childNodes[0].innerText = "J";
    }, flipTime);
  }
});
