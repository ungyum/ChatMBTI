const startBtn = document.querySelector(".start-btn");
const backBtn = document.querySelector(".back-btn");
const startScreen = document.querySelector(".start-screen");
const chatScreen = document.querySelector(".chat-screen");
const helpBtn = document.querySelector(".help-btn");

// 화면 이동: 시작 화면 -> 채팅 화면
startBtn.addEventListener("click", () => {
  startScreen.classList.add("fade-out");
  setTimeout(() => {
    startScreen.classList.add("hidden");
    startScreen.classList.remove("fade-out");
    chatScreen.classList.add("fade-in");
    chatScreen.classList.remove("hidden");
    setTimeout(() => {
      chatScreen.classList.remove("fade-in");
    }, 300);
  }, 300);
});
// 시작화면 -> 채팅화면 시 help icon 애니메이션 주기
startBtn.addEventListener("click", () => {
  console.log("clicked");
  helpBtn.classList.remove("heart-beat");
  helpBtn.offsetWidth = helpBtn.offsetWidth;
  helpBtn.classList.add("heart-beat");
});

// 화면 이동: 채팅 화면 -> 시작 화면
backBtn.addEventListener("click", () => {
  chatScreen.classList.add("fade-out");
  setTimeout(() => {
    chatScreen.classList.add("hidden");
    chatScreen.classList.remove("fade-out");
    startScreen.classList.add("fade-in");
    startScreen.classList.remove("hidden");
    setTimeout(() => {
      startScreen.classList.remove("fade-in");
    }, 300);
  }, 300);
});
