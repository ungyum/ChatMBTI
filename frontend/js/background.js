const screen = document.querySelector(".screen");
const banner = document.querySelector(".banner");
const ad = document.querySelector(".ad");
const bannerHeight = banner.offsetHeight;
const adHeight = ad.offsetHeight;

// 초기에 사이즈 설정해주고
const adjustScreenHeight = () => {
  screen.style.setProperty(
    "--screen-height",
    window.innerHeight - bannerHeight - adHeight + "px"
  );
};
adjustScreenHeight();

// 창 크기 변경할때마다 다시 설정
window.addEventListener("resize", adjustScreenHeight);
