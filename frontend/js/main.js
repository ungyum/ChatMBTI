const startBtn = document.querySelector(".start-btn");
const startScreen = document.querySelector(".start-screen");
const chatScreen = document.querySelector(".chat-screen");
const backBtn = document.querySelector(".back-btn");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
  startScreen.classList.remove("hidden");
  chatScreen.classList.add("hidden");
});
