const screen = document.querySelector(".screen");
const banner = document.querySelector(".banner");
const ad = document.querySelector(".ad");
const bannerHeight = banner.offsetHeight;
const adHeight = ad.offsetHeight;
let mobileViewHeight = window.innerHeight;

// 초기에 사이즈 설정해주고
screen.style.height = mobileViewHeight - bannerHeight - adHeight + "px";

// 창 크기 변경할때마다 다시 설정
window.addEventListener("resize", () => {
  mobileViewHeight = window.innerHeight;
  screen.style.height = mobileViewHeight - bannerHeight - adHeight + "px";
});
