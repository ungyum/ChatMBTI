const screen = document.querySelector(".screen");
const banner = document.querySelector(".banner");
const ad = document.querySelector(".ad-bottom");
const bannerHeight = banner.offsetHeight;
const adHeight = ad.offsetHeight;
const body = document.querySelector("body");

// 화면 높이 설정
const adjustScreenHeight = () => {
  screen.style.setProperty(
    "--screen-height",
    body.offsetHeight - bannerHeight - adHeight + "px"
  );
};

// 시작 @@@@@@@@@@@@@@@@@@@@@@@
adjustScreenHeight();

// 창 크기 변경할때마다 화면 높이 다시 설정
window.addEventListener("resize", adjustScreenHeight);

// 더블클릭 확대 방지
document.ondblclick = function (e) {
  e.preventDefault();
};
