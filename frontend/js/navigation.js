const startBtn = document.querySelector(".start-btn");
const startScreen = document.querySelector(".start-screen");
const chatScreen = document.querySelector(".chat-screen");
const backBtn = document.querySelector(".back-btn");

// 화면 이동
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
