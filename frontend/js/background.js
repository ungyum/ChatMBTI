const screen = document.querySelector(".screen");
const banner = document.querySelector(".banner");
const ad = document.querySelector(".ad");
let mobileViewHeight = window.innerHeight;

// screen 크기 설정
screen.style.height =
  mobileViewHeight - banner.offsetHeight - ad.offsetHeight + "px";
